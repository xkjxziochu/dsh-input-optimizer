import s from '@deepseek-ai/schemastery';
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
export declare const PromptOptimizerSettingsSchema: s<Schemastery.ObjectS<NoInfer<{
    optimizeProvider: s<string, string, "volatile-defined">;
    optimizeModel: s<string, string, "volatile-defined">;
    optimizeReasoningEffort: s<string, string, "volatile-defined">;
    optimizePrompt: s<string, string, "volatile-defined">;
    contextTurns: s<number, number, "volatile-defined">;
}>>, Schemastery.ObjectT<NoInfer<{
    optimizeProvider: s<string, string, "volatile-defined">;
    optimizeModel: s<string, string, "volatile-defined">;
    optimizeReasoningEffort: s<string, string, "volatile-defined">;
    optimizePrompt: s<string, string, "volatile-defined">;
    contextTurns: s<number, number, "volatile-defined">;
}>>, "plain">;
