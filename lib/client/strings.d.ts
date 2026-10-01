/**
 * Bilingual UI strings for dsh-input-optimizer (zh/en). Registered as one
 * namespace into the DSH locale runtime; every slot component declares that
 * namespace and reads copy through the framework-injected `t` seat, so the
 * UI follows the DSH settings language switch automatically.
 */
export type PromptOptimizerStrings = {
    settingsTitle: string;
    settingsDescription: string;
    loading: string;
    saveFailed: string;
    modelNone: string;
    showDefaultPrompt: string;
    hideDefaultPrompt: string;
    effortDefaultLabel: string;
    effortLoadingLabel: string;
    routesStatus: string;
    routesUnavailable: string;
    optimizeButton: string;
    optimizeBusy: string;
    optimizeFailed: string;
    optimizeEmpty: string;
    optimizePanelTitle: string;
    optimizeOriginalLabel: string;
    optimizeOptimizedLabel: string;
    optimizeAdopt: string;
    optimizeCancel: string;
    optimizeNotConfigured: string;
    optimizeSectionLabel: string;
    optimizeModelLabel: string;
    optimizeModelHint: string;
    optimizeEffortLabel: string;
    optimizeEffortHint: string;
    optimizePromptLabel: string;
    optimizePromptHint: string;
    optimizePromptPlaceholder: string;
    contextTurnsLabel: string;
    contextTurnsHint: string;
};
export declare const zh: PromptOptimizerStrings;
export declare const en: PromptOptimizerStrings;
/** Namespace owning every prompt-optimizer surface string. Registered into
 * the DSH locale runtime; slots declaring this namespace receive the typed `t`. */
export declare const PROMPT_OPTIMIZER_NS = "prompt-optimizer";
declare module '@deepseek-ai/dsh-client-ui-slots' {
    /** Prompt-optimizer dictionary keys (one shared key set, zh/en bilingual). */
    interface LocaleNamespaceMap {
        'prompt-optimizer': keyof PromptOptimizerStrings;
    }
}
