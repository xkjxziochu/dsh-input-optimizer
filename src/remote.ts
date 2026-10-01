import type { RemoteResult, TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol'
import type { ClientRemote } from '@deepseek-ai/dsh-api-remotes/client'
import { listRoutesResultSchema, optimizeResultSchema, promptOptimizerSettingsPatchSchema, promptOptimizerSettingsViewSchema, resolveModelEffortsResultSchema, textSchema } from './remote-contract.js'
import type { PromptOptimizerSettingsPatch, PromptOptimizerSettingsView, ModelRoute, ReasoningEffortInfo } from './remote-contract.js'

export type PromptOptimizerRemote = ClientRemote['promptOptimizer']

declare module '@deepseek-ai/dsh-typert-protocol' {
  interface TypertRemoteNamespace$promptOptimizer {
    getSettings: () => Promise<RemoteResult<PromptOptimizerSettingsView>>
    updateSettings: (patch: PromptOptimizerSettingsPatch, signal?: AbortSignal) => Promise<RemoteResult<PromptOptimizerSettingsView>>
    listRoutes: () => Promise<RemoteResult<ModelRoute[]>>
    resolveModelEfforts: (provider: string, model: string) => Promise<RemoteResult<{ efforts: readonly ReasoningEffortInfo[]; defaultEffort?: string }>>
    optimize: (text: string, provider: string, model: string, context: string, signal?: AbortSignal) => Promise<RemoteResult<string>>
  }

  interface TypertRemoteMap {
    'promptOptimizer/getSettings': () => Promise<RemoteResult<PromptOptimizerSettingsView>>
    'promptOptimizer/updateSettings': (patch: PromptOptimizerSettingsPatch, signal?: AbortSignal) => Promise<RemoteResult<PromptOptimizerSettingsView>>
    'promptOptimizer/listRoutes': () => Promise<RemoteResult<ModelRoute[]>>
    'promptOptimizer/resolveModelEfforts': (provider: string, model: string) => Promise<RemoteResult<{ efforts: readonly ReasoningEffortInfo[]; defaultEffort?: string }>>
    'promptOptimizer/optimize': (text: string, provider: string, model: string, context: string, signal?: AbortSignal) => Promise<RemoteResult<string>>
  }

  interface TypertRemoteNamespaceMap {
    promptOptimizer: TypertRemoteNamespace$promptOptimizer
  }
}

export const TYPERT_REMOTE: TypertRemoteContribution = {
  package: 'dsh-input-optimizer',
  descriptors: [
    {
      id: 'dsh-input-optimizer#promptOptimizer/getSettings',
      service: 'PromptOptimizer',
      namespace: 'promptOptimizer',
      method: 'getSettings',
      invocation: { kind: 'direct' },
      parameters: [],
      result: {
        mode: 'strict',
        typeSymbol: 'dsh-input-optimizer#PromptOptimizerSettingsView',
        create: () => promptOptimizerSettingsViewSchema
      }
    },
    {
      id: 'dsh-input-optimizer#promptOptimizer/updateSettings',
      service: 'PromptOptimizer',
      namespace: 'promptOptimizer',
      method: 'updateSettings',
      invocation: { kind: 'direct' },
      parameters: [{
        name: 'patch',
        wire: 'patch',
        source: 'json',
        codec: { mode: 'strict', typeSymbol: 'dsh-input-optimizer#PromptOptimizerSettingsPatch', create: () => promptOptimizerSettingsPatchSchema }
      }],
      cancellation: { parameter: 'signal' },
      result: {
        mode: 'strict',
        typeSymbol: 'dsh-input-optimizer#PromptOptimizerSettingsView',
        create: () => promptOptimizerSettingsViewSchema
      }
    },
    {
      id: 'dsh-input-optimizer#promptOptimizer/listRoutes',
      service: 'PromptOptimizer',
      namespace: 'promptOptimizer',
      method: 'listRoutes',
      invocation: { kind: 'direct' },
      parameters: [],
      result: {
        mode: 'strict',
        typeSymbol: 'dsh-input-optimizer#ModelRoute[]',
        create: () => listRoutesResultSchema
      }
    },
    {
      id: 'dsh-input-optimizer#promptOptimizer/resolveModelEfforts',
      service: 'PromptOptimizer',
      namespace: 'promptOptimizer',
      method: 'resolveModelEfforts',
      invocation: { kind: 'direct' },
      parameters: [
        {
          name: 'provider',
          wire: 'provider',
          source: 'json',
          codec: { mode: 'strict', typeSymbol: 'string', create: () => textSchema }
        },
        {
          name: 'model',
          wire: 'model',
          source: 'json',
          codec: { mode: 'strict', typeSymbol: 'string', create: () => textSchema }
        }
      ],
      result: {
        mode: 'strict',
        typeSymbol: 'dsh-input-optimizer#ResolveModelEffortsResult',
        create: () => resolveModelEffortsResultSchema
      }
    },
    {
      id: 'dsh-input-optimizer#promptOptimizer/optimize',
      service: 'PromptOptimizer',
      namespace: 'promptOptimizer',
      method: 'optimize',
      invocation: { kind: 'direct' },
      parameters: [
        {
          name: 'text',
          wire: 'text',
          source: 'json',
          codec: { mode: 'strict', typeSymbol: 'string', create: () => textSchema }
        },
        {
          name: 'provider',
          wire: 'provider',
          source: 'json',
          codec: { mode: 'strict', typeSymbol: 'string', create: () => textSchema }
        },
        {
          name: 'model',
          wire: 'model',
          source: 'json',
          codec: { mode: 'strict', typeSymbol: 'string', create: () => textSchema }
        },
        {
          name: 'context',
          wire: 'context',
          source: 'json',
          codec: { mode: 'strict', typeSymbol: 'string', create: () => textSchema }
        }
      ],
      cancellation: { parameter: 'signal' },
      result: {
        mode: 'strict',
        typeSymbol: 'string',
        create: () => optimizeResultSchema
      }
    }
  ]
}

export default TYPERT_REMOTE
