/**
 * Structural guard for the shapes `@deepseek-ai/dsh-typert-loader` validates at
 * registration time. Declaring them here keeps `tsc` checking this manifest:
 * the loader rejects a codec without a `create()` factory with
 * `typert-loader: <pkg> <subject> has no create() factory`, and without a type
 * annotation that mistake only surfaces at runtime as a FAILED fiber.
 * @see requireStrictCodec in dsh-typert-loader/lib/index.js
 */
interface StrictCodec {
    readonly mode: 'strict';
    readonly typeSymbol: string;
    readonly create: () => {
        parse(value: unknown): unknown;
    };
    readonly decode?: (value: unknown) => unknown;
    readonly encode?: (value: unknown) => unknown;
}
interface InvocationParameterShape {
    readonly name: string;
    readonly wire: string;
    readonly source: 'json' | 'lookup';
    readonly lookup?: string;
    readonly codec: StrictCodec;
}
interface InvocationShape {
    readonly id: string;
    readonly service: string;
    readonly namespace: string;
    readonly method: string;
    readonly invocation: {
        readonly kind: 'direct';
    };
    readonly parameters: readonly InvocationParameterShape[];
    readonly cancellation?: {
        readonly parameter: 'signal';
    };
    readonly result: StrictCodec;
}
export declare const TYPERT: {
    readonly package: "dsh-input-optimizer";
    readonly face: "host";
    readonly schemas: readonly [];
    readonly invocations: readonly InvocationShape[];
    readonly model: {
        readonly services: readonly [{
            readonly description: "Host-side prompt optimization through dsh LLM routes.";
            readonly summary: "Prompt optimization service.";
            readonly tags: readonly [];
            readonly jsDoc: "/** Host-side prompt optimization through dsh LLM routes. */";
            readonly key: "PromptOptimizer";
            readonly exportName: "PromptOptimizerService";
            readonly members: readonly [{
                readonly kind: "method";
                readonly name: "getSettings";
                readonly signature: "getSettings(): PromptOptimizerSettingsView";
                readonly summary: "Read the current plugin settings.";
                readonly jsDoc: "/** Read the current plugin settings. */";
            }, {
                readonly kind: "method";
                readonly name: "updateSettings";
                readonly signature: "updateSettings(patch: PromptOptimizerSettingsPatch, signal: AbortSignal): Promise<PromptOptimizerSettingsView>";
                readonly summary: "Update plugin settings when the request has not been cancelled.";
                readonly jsDoc: "/** Update plugin settings when the request has not been cancelled. */";
            }, {
                readonly kind: "method";
                readonly name: "listRoutes";
                readonly signature: "listRoutes(): Promise<ModelRoute[]>";
                readonly summary: "List models already registered in dsh.";
                readonly jsDoc: "/** List models already registered in dsh. */";
            }, {
                readonly kind: "method";
                readonly name: "resolveModelEfforts";
                readonly signature: "resolveModelEfforts(provider: string, model: string): Promise<{ efforts: readonly ReasoningEffortInfo[]; defaultEffort?: string }>";
                readonly summary: "Resolve reasoning-effort tiers for one route (lazy).";
                readonly jsDoc: "/** Resolve reasoning-effort tiers for one route (lazy). */";
            }, {
                readonly kind: "method";
                readonly name: "optimize";
                readonly signature: "optimize(text: string, provider: string, model: string, context: string, signal: AbortSignal): Promise<string>";
                readonly summary: "Optimize one prompt through a selected dsh route.";
                readonly jsDoc: "/** Optimize one prompt through a selected dsh route. */";
            }];
            readonly types: readonly [{
                readonly name: "PromptOptimizerSettingsView";
                readonly declaration: "export interface PromptOptimizerSettingsView { available: boolean; writable: boolean; settings: PromptOptimizerSettings; overridden: string[]; defaultOptimizePrompt: string }";
            }, {
                readonly name: "PromptOptimizerSettingsPatch";
                readonly declaration: "export type PromptOptimizerSettingsPatch = Partial<PromptOptimizerSettings>";
            }, {
                readonly name: "ModelRoute";
                readonly declaration: "export interface ReasoningEffortInfo { id: string; name: string; description?: string } export interface ModelRoute { provider: string; providerName: string; model: string; modelName: string; reasoningEfforts: readonly ReasoningEffortInfo[]; defaultReasoningEffort?: string }";
            }];
        }];
        readonly events: readonly [];
        readonly objects: readonly [];
    };
};
export default TYPERT;
