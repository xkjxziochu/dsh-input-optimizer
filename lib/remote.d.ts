import type { RemoteResult, TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol';
import type { ClientRemote } from '@deepseek-ai/dsh-api-remotes/client';
import type { PromptOptimizerSettingsPatch, PromptOptimizerSettingsView, ModelRoute, ReasoningEffortInfo } from './remote-contract.js';
export type PromptOptimizerRemote = ClientRemote['promptOptimizer'];
declare module '@deepseek-ai/dsh-typert-protocol' {
    interface TypertRemoteNamespace$promptOptimizer {
        getSettings: () => Promise<RemoteResult<PromptOptimizerSettingsView>>;
        updateSettings: (patch: PromptOptimizerSettingsPatch, signal?: AbortSignal) => Promise<RemoteResult<PromptOptimizerSettingsView>>;
        listRoutes: () => Promise<RemoteResult<ModelRoute[]>>;
        resolveModelEfforts: (provider: string, model: string) => Promise<RemoteResult<{
            efforts: readonly ReasoningEffortInfo[];
            defaultEffort?: string;
        }>>;
        optimize: (text: string, provider: string, model: string, context: string, signal?: AbortSignal) => Promise<RemoteResult<string>>;
    }
    interface TypertRemoteMap {
        'promptOptimizer/getSettings': () => Promise<RemoteResult<PromptOptimizerSettingsView>>;
        'promptOptimizer/updateSettings': (patch: PromptOptimizerSettingsPatch, signal?: AbortSignal) => Promise<RemoteResult<PromptOptimizerSettingsView>>;
        'promptOptimizer/listRoutes': () => Promise<RemoteResult<ModelRoute[]>>;
        'promptOptimizer/resolveModelEfforts': (provider: string, model: string) => Promise<RemoteResult<{
            efforts: readonly ReasoningEffortInfo[];
            defaultEffort?: string;
        }>>;
        'promptOptimizer/optimize': (text: string, provider: string, model: string, context: string, signal?: AbortSignal) => Promise<RemoteResult<string>>;
    }
    interface TypertRemoteNamespaceMap {
        promptOptimizer: TypertRemoteNamespace$promptOptimizer;
    }
}
export declare const TYPERT_REMOTE: TypertRemoteContribution;
export default TYPERT_REMOTE;
