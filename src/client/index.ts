import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Loads the conversation SlotMap augmentation (registers
// 'conversation.input.right').
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
// Loads the settings SlotMap augmentation ('settings.section').
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { TYPERT_REMOTE } from '../remote.js'
import type { PromptOptimizerRemote } from '../remote.js'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { PROMPT_OPTIMIZER_NS, en, zh } from './strings.js'
import { OptimizeButton } from './OptimizeButton.js'
import { PromptOptimizerSettingsSection } from './settings.jsx'
import { SettingsController, useSettingsSnapshot, type SettingsFace } from './settings-controller.js'

/** Required Client services: the slot registry, the Typert remote hub, and
 * the DSH locale runtime. `remote.promptOptimizer` is mounted by this
 * plugin's own apply() via `ctx.remote.$mount`, so it MUST NOT appear here —
 * the outer inject gates plugin activation and would deadlock waiting for
 * itself. It is declared only on the inner ctx.inject() below, which runs
 * after the mount. */
export const inject = ['slots', 'remote', 'locale', 'conversation']

export async function apply(ctx: ClientContext): Promise<() => Promise<void>> {
  const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE)
  // Register our bilingual dictionary with the DSH locale runtime BEFORE any
  // slot renders, so the injected `t` seat never hits a missing namespace.
  const disposeLocaleDicts = ctx.locale.register(PROMPT_OPTIMIZER_NS, { zh, en })
  await ctx.inject(['slots', 'remote', 'remote.promptOptimizer'], async (remoteCtx) => {
    const remote = remoteCtx.remote.promptOptimizer as PromptOptimizerRemote
    const controller = new SettingsController(remote)

    remoteCtx.effect(() => () => {
      controller.dispose()
    }, 'dsh-input-optimizer controller lifecycle')

    void controller.refreshSettings()
    void controller.refreshRoutes()

    const useSettings = (): SettingsFace => {
      const snapshot = useSettingsSnapshot(controller)
      if (snapshot.status !== 'ready') return { status: 'loading', settings: snapshot.view.settings }
      return { status: 'ready', settings: snapshot.view.settings }
    }

    // The sparkle (prompt-optimize) button sits inline inside the
    // `conversation.input.right` toolbar, immediately to the left of the
    // microphone. order = 9998 places it one slot before the mic (9999),
    // which is the rightmost edge of the public right slot.
    remoteCtx.slots.inject('conversation.input.right', () =>
      remoteCtx.slots.register(
        {
          name: 'conversation.input.right',
          id: 'prompt-optimizer-button',
          order: 9998,
          locale: PROMPT_OPTIMIZER_NS,
          inject: () => ({
            remote,
            useSettings
          })
        },
        OptimizeButton
      )
    )

    remoteCtx.slots.inject('settings.section', () =>
      remoteCtx.slots.register(
        {
          name: 'settings.section',
          id: 'dsh-input-optimizer',
          order: 16,
          // Thunk so the sidebar row follows the active locale on switches.
          label: () => ctx.locale.bind(PROMPT_OPTIMIZER_NS)('settingsTitle'),
          locale: PROMPT_OPTIMIZER_NS,
          inject: () => ({ settingsController: controller })
        },
        PromptOptimizerSettingsSection
      )
    )

    return () => {
      // Slots and effects are disposed through their own fiber.
    }
  })

  return async () => {
    disposeLocaleDicts()
    await disposeRemote()
  }
}
