import { createUserMessage } from '@deepseek-ai/dsh-llm'
import type { Context } from '@deepseek-ai/cordis'
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import type { SettingsDescriptor } from '@deepseek-ai/dsh-settings'
import type { LlmModelInfo, LlmResolvedModelInfo, StreamChunk } from '@deepseek-ai/dsh-llm'
import { DEFAULT_SETTINGS, MAX_OPTIMIZED_CHARACTERS, MAX_OPTIMIZE_CHARACTERS, OPTIMIZE_TIMEOUT_MS, SETTINGS_NAMESPACE, validateSettings, type PromptOptimizerSettings, type PromptOptimizerSettingsPatch, type PromptOptimizerSettingsView, type ModelRoute, type ReasoningEffortInfo } from '../config.js'
import { optimizeUserText, resolveOptimizeSystemPrompt, OPTIMIZE_SYSTEM_PROMPT } from './prompts.js'

/**
 * Host half of the prompt optimizer: reuses dsh's own LLM routes to rewrite the
 * draft currently in the input box. It owns the plugin settings namespace and
 * exposes the optimize RPC to the browser half over the Typert gateway.
 */
export class PromptOptimizerService extends TypertRemoteService {
  static inject = ['llm']

  constructor(ctx: Context) {
    super(ctx, 'PromptOptimizer', { namespace: 'promptOptimizer' })
  }

  /**
   * Read this plugin's own settings entry off the dsh settings service.
   *
   * dsh 0.2.0-rc.2 dropped the old `settings.register()` scope API: a plugin's
   * settings namespace is now derived from its exported `Config` schema, and
   * live values are read through `describe()`. Reading on demand instead of
   * caching in a field keeps values correct after the loader restarts this
   * plugin with a freshly written config.
   */
  private descriptor(): SettingsDescriptor | undefined {
    return this.ctx.get('settings')?.describe({ redactSecrets: true }).find((item) => String(item.ns) === SETTINGS_NAMESPACE)
  }

  getSettings(): PromptOptimizerSettingsView {
    const descriptor = this.descriptor()
    if (descriptor === undefined) {
      return {
        available: false,
        writable: false,
        settings: { ...DEFAULT_SETTINGS },
        overridden: [],
        defaultOptimizePrompt: OPTIMIZE_SYSTEM_PROMPT
      }
    }
    return {
      available: true,
      writable: this.ctx.get('settings')?.writable ?? false,
      // `describe()` already unwraps volatile references through `plainConfig`,
      // so the projected value is ordinary JSON-shaped settings data.
      settings: flattenStoredSettings(descriptor.value),
      overridden: isRecord(descriptor.user) ? Object.keys(descriptor.user) : [],
      defaultOptimizePrompt: OPTIMIZE_SYSTEM_PROMPT
    }
  }

  async updateSettings(patch: PromptOptimizerSettingsPatch, signal: AbortSignal): Promise<PromptOptimizerSettingsView> {
    const settings = this.ctx.get('settings')
    const descriptor = this.descriptor()
    if (settings === undefined || descriptor === undefined) return this.getSettings()
    signal.throwIfAborted()
    // Only persist the keys the caller actually supplied: dsh-settings merges
    // the patch into the profile's user section, so writing every field would
    // freeze today's defaults into the file. The merged result is still
    // validated locally so an invalid combination never reaches the document.
    const changes: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(patch)) {
      if (value !== undefined) changes[key] = value
    }
    const next: PromptOptimizerSettings = { ...flattenStoredSettings(descriptor.value) }
    for (const [key, value] of Object.entries(changes)) (next as unknown as Record<string, unknown>)[key] = value
    validateSettings(next)
    // `expectedRevision` makes the write fail loudly instead of clobbering a
    // concurrent edit to the same profile patch.
    await settings.update(SETTINGS_NAMESPACE, changes, descriptor.revision)
    return this.getSettings()
  }

  async listRoutes(): Promise<ModelRoute[]> {
    const routes: ModelRoute[] = []
    // NOTE: listRoutes intentionally skips per-model resolveModelInfo() calls.
    // Each resolution can require a roundtrip to the adapter/provider and a
    // registry with many models would make the settings page block for many
    // seconds on first open. Reasoning-effort metadata therefore arrives as
    // an empty array / undefined defaultEffort in the returned routes. The
    // settings UI hides the reasoning-effort dropdown entirely when the
    // list of efforts is empty, so users never see a half-populated menu.
    // Efforts are fetched lazily per route through resolveModelEfforts().
    for (const provider of this.ctx.llm.listProviders()) {
      let models: readonly LlmModelInfo[]
      try {
        models = await this.ctx.llm.listModels(provider.id)
      } catch {
        continue
      }
      for (const model of models) {
        // NOTE: never assign an explicit `undefined` value. The Typert
        // gateway's boundary validation rejects any own-key holding
        // undefined as "not JSON-safe" after the Zod check passes, so
        // optional fields must simply be omitted.
        routes.push({
          provider: provider.id,
          providerName: provider.name,
          model: model.id,
          modelName: model.name,
          reasoningEfforts: []
        })
      }
    }
    return routes
  }

  /**
   * Lazily resolve reasoning efforts for a single route. Only called once the
   * settings UI actually displays that model's effort selector — so we never
   * blast the adapter/provider with hundreds of upfront resolveModelInfo calls.
   * Returns `{ efforts: [] }` (no defaultEffort key) if the metadata is
   * unavailable (adapter offline, model unknown, etc.).
   */
  async resolveModelEfforts(provider: string, model: string): Promise<{ efforts: readonly ReasoningEffortInfo[]; defaultEffort?: string }> {
    const resolved: LlmResolvedModelInfo | undefined = await (async () => {
      try {
        return await this.ctx.llm.resolveModelInfo(provider, model)
      } catch {
        return undefined
      }
    })()
    const reasoning = resolved?.reasoning
    const defaultEffort = reasoning?.defaultEffort != null ? String(reasoning.defaultEffort) : undefined
    // Optional fields are omitted rather than assigned undefined — the
    // gateway's JSON-safe boundary check rejects explicit undefined values.
    return {
      efforts: reasoning?.efforts?.map((effort) => ({
        id: String(effort.id),
        name: effort.name,
        ...(effort.description === undefined ? {} : { description: effort.description })
      })) ?? [],
      ...(defaultEffort === undefined ? {} : { defaultEffort })
    }
  }

  async optimize(text: string, provider: string, model: string, context: string, signal: AbortSignal): Promise<string> {
    const raw = text.trim()
    if (raw === '' || raw.length > MAX_OPTIMIZE_CHARACTERS || signal.aborted) return raw
    const settings = flattenStoredSettings(this.descriptor()?.value ?? DEFAULT_SETTINGS)
    const storedPrompt = settings.optimizePrompt
    const effort = settings.optimizeReasoningEffort

    const routeProvider = provider.trim()
    const routeModel = model.trim()
    if (routeProvider === '' || routeModel === '') throw new Error('No dsh LLM route configured for prompt optimization')

    const timeout = new AbortController()
    const timer = setTimeout(() => timeout.abort(), OPTIMIZE_TIMEOUT_MS)
    const forwardAbort = () => timeout.abort(signal.reason)
    signal.addEventListener('abort', forwardAbort, { once: true })

    try {
      const result = await this.completeOptimize(routeProvider, routeModel, raw, context, storedPrompt, effort, timeout.signal)
      if (result.trim() === '' && !timeout.signal.aborted && !signal.aborted) {
        return raw
      }
      return result
    } catch (error) {
      if (signal.aborted) throw error
      if (timeout.signal.aborted) throw new Error('The dsh LLM optimize request timed out')
      throw error instanceof Error ? error : new Error('The dsh LLM route did not complete optimization')
    } finally {
      clearTimeout(timer)
      signal.removeEventListener('abort', forwardAbort)
    }
  }

  private async completeOptimize(provider: string, model: string, raw: string, context: string, storedPrompt: string, effort: string, signal: AbortSignal): Promise<string> {
    const config = await this.resolveEffortConfig(provider, model, effort, signal)
    const prepared = await this.ctx.llm.prepareCall(config, signal)
    const message = createUserMessage({
      content: [{ type: 'text', text: optimizeUserText(raw) }],
      source: { kind: 'user' }
    })
    const output = await collectText(prepared.stream({
      ...prepared.config,
      messages: [message],
      system: resolveOptimizeSystemPrompt(storedPrompt, context),
      signal
    }), MAX_OPTIMIZED_CHARACTERS, 'optimization')
    if (output === '') throw new Error('The dsh LLM route returned no optimized text')
    return output
  }

  /**
   * Resolve the effective reasoning-effort wire config for one route. An
   * explicit stored selection is forwarded as-is. The empty default means
   * "thinking off": when the model advertises an `off` tier we send it, and
   * otherwise we omit the field so the adapter's own default applies.
   */
  private async resolveEffortConfig(provider: string, model: string, storedEffort: string, signal: AbortSignal): Promise<{ provider: string; model: string; reasoningEffort?: never }> {
    const selected = storedEffort.trim()
    if (selected !== '') return { provider, model, reasoningEffort: selected as never }
    try {
      const resolved = await this.ctx.llm.resolveModelInfo(provider, model, signal)
      const efforts = resolved.reasoning?.efforts ?? []
      const hasOff = efforts.some((effort) => String(effort.id) === 'off')
      return hasOff ? { provider, model, reasoningEffort: 'off' as never } : { provider, model }
    } catch {
      return { provider, model }
    }
  }
}

function flattenStoredSettings(raw: unknown): PromptOptimizerSettings {
  const record = isRecord(raw) ? raw : {}
  return {
    optimizeProvider: text(record.optimizeProvider),
    optimizeModel: text(record.optimizeModel),
    optimizeReasoningEffort: text(record.optimizeReasoningEffort),
    optimizePrompt: typeof record.optimizePrompt === 'string' ? record.optimizePrompt : '',
    contextTurns: typeof record.contextTurns === 'number' ? record.contextTurns : DEFAULT_SETTINGS.contextTurns,
  }
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function collectText(stream: AsyncIterable<StreamChunk>, maxCharacters: number, label: string): Promise<string> {
  let text = ''
  let sawDelta = false

  for await (const chunk of stream) {
    if (chunk.type === 'text-delta') {
      text += chunk.text
      if (text.length > maxCharacters) throw new Error(`The dsh LLM ${label} response is too large`)
      sawDelta = true
      continue
    }

    if (chunk.type === 'finish' && (chunk.reason.kind === 'error' || chunk.reason.kind === 'aborted')) {
      throw new Error(`The dsh LLM route did not complete ${label}`)
    }

    if (!sawDelta && chunk.type === 'block-end' && chunk.block.type === 'text') {
      text += chunk.block.text
      if (text.length > maxCharacters) throw new Error(`The dsh LLM ${label} response is too large`)
    }
  }

  return text.trim()
}
