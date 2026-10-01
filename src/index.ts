import type { Context } from '@deepseek-ai/cordis'
import { PromptOptimizerService } from './optimize/service.js'
import { PromptOptimizerSettingsSchema } from './config-schema.js'

export const name = 'dsh-input-optimizer'

/**
 * The plugin Config *is* the settings form. cordis reads `plugin.Config` off
 * the plugin object and stores it as `fiber.runtime.Config`, which is what
 * dsh-settings inspects to derive this plugin's settings namespace and its
 * editable fields. Dropping this export silently removes the settings page.
 */
export const Config = PromptOptimizerSettingsSchema

/**
 * Host half of dsh-input-optimizer.
 *
 * Contributes exactly one capability: rewriting the draft in the dsh input box
 * into a better prompt through dsh's own LLM routes (same providers and
 * credentials the harness already uses), plus the plugin settings namespace.
 * The browser half renders the button and the original/optimized confirm panel.
 */
export async function apply(ctx: Context): Promise<void> {
  await ctx.plugin(PromptOptimizerService)

  ctx.effect(() => {
    return () => undefined
  }, 'dsh-input-optimizer lifecycle')
}
