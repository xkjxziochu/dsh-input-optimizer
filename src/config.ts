/**
 * Shared constants and types for dsh-input-optimizer.
 *
 * The plugin exposes exactly one capability: rewriting the draft currently in
 * the dsh input box into a better prompt through dsh's own configured LLM
 * routes, then showing the original/optimized comparison for confirmation.
 */

export const SETTINGS_NAMESPACE = 'dsh-input-optimizer'

export const MAX_OPTIMIZE_PROMPT_LENGTH = 4000
export const MAX_OPTIMIZE_CHARACTERS = 12_000
export const MAX_OPTIMIZED_CHARACTERS = 24_000
export const OPTIMIZE_TIMEOUT_MS = 20_000

export interface PromptOptimizerSettings {
  /** dsh optimize provider id (a route already registered in dsh). */
  optimizeProvider: string
  /** dsh optimize model id. */
  optimizeModel: string
  /** Selected reasoning effort id for optimize, empty uses the adapter's default (usually the lightest). */
  optimizeReasoningEffort: string
  /** Custom optimize system prompt, empty for the built-in one. */
  optimizePrompt: string
  /** Number of recent conversation turns to include as context for optimization. 0 disables context. */
  contextTurns: number
}

/**
 * Out-of-the-box defaults: reasoning effort left empty, which the Host
 * translates to "thinking off" (the model's `off` tier when it exposes one,
 * otherwise the adapter's own default).
 * Provider/model stay empty and get auto-filled on first settings page
 * load via SettingsController (first route returned by listRoutes).
 */
export const DEFAULT_SETTINGS: PromptOptimizerSettings = Object.freeze({
  optimizeProvider: '',
  optimizeModel: '',
  optimizeReasoningEffort: '',
  optimizePrompt: '',
  contextTurns: 3,
})

export type PromptOptimizerSettingsPatch = Partial<PromptOptimizerSettings>

/** One selectable reasoning effort tier for a specific model route. */
export interface ReasoningEffortInfo {
  /** Stable id passed to `LlmCallConfig.reasoningEffort`. */
  readonly id: string
  /** Display name shown in the settings dropdown. */
  readonly name: string
  /** Optional longer description shown in a tooltip. */
  readonly description?: string
}

/** A usable (provider, model) pair returned by dsh's LLM runtime, plus any
 *  reasoning-effort tiers the model reports as selectable. The efforts
 *  list is empty when the adapter / model does not expose thinking
 *  controls — in that case the settings dropdown is hidden entirely.
 *  `defaultEffort` is the adapter-configured baseline (generally the
 *  lightest tier); we use it as the placeholder label in the UI and as
 *  the fallback when the stored effort string is empty.
 */
export interface ModelRoute {
  readonly provider: string
  readonly providerName: string
  readonly model: string
  readonly modelName: string
  readonly reasoningEfforts: readonly ReasoningEffortInfo[]
  readonly defaultReasoningEffort?: string
}

export interface PromptOptimizerSettingsView {
  available: boolean
  writable: boolean
  settings: PromptOptimizerSettings
  overridden: string[]
  /** The built-in optimize system prompt, shown in the settings page. */
  defaultOptimizePrompt: string
}

export function isValidContextTurns(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 0 && value <= 20
}

export function validateSettings(settings: PromptOptimizerSettings): void {
  if (!isValidContextTurns(settings.contextTurns)) {
    throw new Error('dsh-input-optimizer context turns must be between 0 and 20')
  }
  if (settings.optimizePrompt.trim().length > MAX_OPTIMIZE_PROMPT_LENGTH) {
    throw new Error('dsh-input-optimizer optimize prompt is too long')
  }
}
