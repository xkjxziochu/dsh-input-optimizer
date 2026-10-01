import type { Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { type PromptOptimizerSettingsPatch, type PromptOptimizerSettingsView, type ModelRoute, type ReasoningEffortInfo } from '../config.js';
/**
 * Host half of the prompt optimizer: reuses dsh's own LLM routes to rewrite the
 * draft currently in the input box. It owns the plugin settings namespace and
 * exposes the optimize RPC to the browser half over the Typert gateway.
 */
export declare class PromptOptimizerService extends TypertRemoteService {
    static inject: string[];
    constructor(ctx: Context);
    /**
     * Read this plugin's own settings entry off the dsh settings service.
     *
     * dsh 0.2.0-rc.2 dropped the old `settings.register()` scope API: a plugin's
     * settings namespace is now derived from its exported `Config` schema, and
     * live values are read through `describe()`. Reading on demand instead of
     * caching in a field keeps values correct after the loader restarts this
     * plugin with a freshly written config.
     */
    private descriptor;
    getSettings(): PromptOptimizerSettingsView;
    updateSettings(patch: PromptOptimizerSettingsPatch, signal: AbortSignal): Promise<PromptOptimizerSettingsView>;
    listRoutes(): Promise<ModelRoute[]>;
    /**
     * Lazily resolve reasoning efforts for a single route. Only called once the
     * settings UI actually displays that model's effort selector — so we never
     * blast the adapter/provider with hundreds of upfront resolveModelInfo calls.
     * Returns `{ efforts: [] }` (no defaultEffort key) if the metadata is
     * unavailable (adapter offline, model unknown, etc.).
     */
    resolveModelEfforts(provider: string, model: string): Promise<{
        efforts: readonly ReasoningEffortInfo[];
        defaultEffort?: string;
    }>;
    optimize(text: string, provider: string, model: string, context: string, signal: AbortSignal): Promise<string>;
    private completeOptimize;
    /**
     * Resolve the effective reasoning-effort wire config for one route. An
     * explicit stored selection is forwarded as-is. The empty default means
     * "thinking off": when the model advertises an `off` tier we send it, and
     * otherwise we omit the field so the adapter's own default applies.
     */
    private resolveEffortConfig;
}
