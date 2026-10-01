import s from '@deepseek-ai/schemastery'
import { DEFAULT_SETTINGS } from './config.js'

/**
 * Host-only dsh settings schema; keep schemastery out of the browser bundle.
 *
 * This schema is also exported as the plugin's `Config`, so every field must be
 * marked `.volatile()`: dsh-settings 0.2.0-rc.2 derives a plugin's settings
 * namespace from its Config schema and only surfaces the entry in
 * `settings.describe()` when at least one field is volatile. Ordinary config
 * lives in the profile patch; volatile fields are the ones the settings UI may
 * edit live.
 */
export const PromptOptimizerSettingsSchema = s.object({
  optimizeProvider: s.string().default(DEFAULT_SETTINGS.optimizeProvider).description('dsh optimize provider id').volatile(),
  optimizeModel: s.string().default(DEFAULT_SETTINGS.optimizeModel).description('dsh optimize model id').volatile(),
  optimizeReasoningEffort: s
    .string()
    .default(DEFAULT_SETTINGS.optimizeReasoningEffort)
    .description('dsh optimize reasoning effort id, empty uses the adapter default (lowest tier)')
    .volatile(),
  optimizePrompt: s.string().default(DEFAULT_SETTINGS.optimizePrompt).description('Custom optimize system prompt, empty for built-in').volatile(),
  contextTurns: s.number().default(DEFAULT_SETTINGS.contextTurns).description('Recent conversation turns included as context for optimization (0 = disabled)').volatile(),
})
