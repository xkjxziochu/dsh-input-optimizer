import type { Context } from '@deepseek-ai/cordis';
export declare const name = "dsh-input-optimizer";
/**
 * The plugin Config *is* the settings form. cordis reads `plugin.Config` off
 * the plugin object and stores it as `fiber.runtime.Config`, which is what
 * dsh-settings inspects to derive this plugin's settings namespace and its
 * editable fields. Dropping this export silently removes the settings page.
 */
export declare const Config: import("@deepseek-ai/schemastery").default<Schemastery.ObjectS<NoInfer<{
    optimizeProvider: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    optimizeModel: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    optimizeReasoningEffort: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    optimizePrompt: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    contextTurns: import("@deepseek-ai/schemastery").default<number, number, "volatile-defined">;
}>>, Schemastery.ObjectT<NoInfer<{
    optimizeProvider: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    optimizeModel: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    optimizeReasoningEffort: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    optimizePrompt: import("@deepseek-ai/schemastery").default<string, string, "volatile-defined">;
    contextTurns: import("@deepseek-ai/schemastery").default<number, number, "volatile-defined">;
}>>, "plain">;
/**
 * Host half of dsh-input-optimizer.
 *
 * Contributes exactly one capability: rewriting the draft in the dsh input box
 * into a better prompt through dsh's own LLM routes (same providers and
 * credentials the harness already uses), plus the plugin settings namespace.
 * The browser half renders the button and the original/optimized confirm panel.
 */
export declare function apply(ctx: Context): Promise<void>;
