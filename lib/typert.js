import { a as resolveModelEffortsResultSchema, i as promptOptimizerSettingsViewSchema, n as optimizeResultSchema, o as textSchema, r as promptOptimizerSettingsPatchSchema, t as listRoutesResultSchema } from "./remote-contract-BYMnO1nn.js";
const TYPERT = {
	package: "dsh-input-optimizer",
	face: "host",
	schemas: [],
	invocations: [
		{
			id: "dsh-input-optimizer#promptOptimizer/getSettings",
			service: "PromptOptimizer",
			namespace: "promptOptimizer",
			method: "getSettings",
			invocation: { kind: "direct" },
			parameters: [],
			result: {
				mode: "strict",
				typeSymbol: "dsh-input-optimizer#PromptOptimizerSettingsView",
				create: () => promptOptimizerSettingsViewSchema
			}
		},
		{
			id: "dsh-input-optimizer#promptOptimizer/updateSettings",
			service: "PromptOptimizer",
			namespace: "promptOptimizer",
			method: "updateSettings",
			invocation: { kind: "direct" },
			parameters: [{
				name: "patch",
				wire: "patch",
				source: "json",
				codec: {
					mode: "strict",
					typeSymbol: "dsh-input-optimizer#PromptOptimizerSettingsPatch",
					create: () => promptOptimizerSettingsPatchSchema
				}
			}],
			cancellation: { parameter: "signal" },
			result: {
				mode: "strict",
				typeSymbol: "dsh-input-optimizer#PromptOptimizerSettingsView",
				create: () => promptOptimizerSettingsViewSchema
			}
		},
		{
			id: "dsh-input-optimizer#promptOptimizer/listRoutes",
			service: "PromptOptimizer",
			namespace: "promptOptimizer",
			method: "listRoutes",
			invocation: { kind: "direct" },
			parameters: [],
			result: {
				mode: "strict",
				typeSymbol: "dsh-input-optimizer#ModelRoute[]",
				create: () => listRoutesResultSchema
			}
		},
		{
			id: "dsh-input-optimizer#promptOptimizer/resolveModelEfforts",
			service: "PromptOptimizer",
			namespace: "promptOptimizer",
			method: "resolveModelEfforts",
			invocation: { kind: "direct" },
			parameters: [{
				name: "provider",
				wire: "provider",
				source: "json",
				codec: {
					mode: "strict",
					typeSymbol: "string",
					create: () => textSchema
				}
			}, {
				name: "model",
				wire: "model",
				source: "json",
				codec: {
					mode: "strict",
					typeSymbol: "string",
					create: () => textSchema
				}
			}],
			result: {
				mode: "strict",
				typeSymbol: "dsh-input-optimizer#ResolveModelEffortsResult",
				create: () => resolveModelEffortsResultSchema
			}
		},
		{
			id: "dsh-input-optimizer#promptOptimizer/optimize",
			service: "PromptOptimizer",
			namespace: "promptOptimizer",
			method: "optimize",
			invocation: { kind: "direct" },
			parameters: [
				{
					name: "text",
					wire: "text",
					source: "json",
					codec: {
						mode: "strict",
						typeSymbol: "string",
						create: () => textSchema
					}
				},
				{
					name: "provider",
					wire: "provider",
					source: "json",
					codec: {
						mode: "strict",
						typeSymbol: "string",
						create: () => textSchema
					}
				},
				{
					name: "model",
					wire: "model",
					source: "json",
					codec: {
						mode: "strict",
						typeSymbol: "string",
						create: () => textSchema
					}
				},
				{
					name: "context",
					wire: "context",
					source: "json",
					codec: {
						mode: "strict",
						typeSymbol: "string",
						create: () => textSchema
					}
				}
			],
			cancellation: { parameter: "signal" },
			result: {
				mode: "strict",
				typeSymbol: "string",
				create: () => optimizeResultSchema
			}
		}
	],
	model: {
		services: [{
			description: "Host-side prompt optimization through dsh LLM routes.",
			summary: "Prompt optimization service.",
			tags: [],
			jsDoc: "/** Host-side prompt optimization through dsh LLM routes. */",
			key: "PromptOptimizer",
			exportName: "PromptOptimizerService",
			members: [
				{
					kind: "method",
					name: "getSettings",
					signature: "getSettings(): PromptOptimizerSettingsView",
					summary: "Read the current plugin settings.",
					jsDoc: "/** Read the current plugin settings. */"
				},
				{
					kind: "method",
					name: "updateSettings",
					signature: "updateSettings(patch: PromptOptimizerSettingsPatch, signal: AbortSignal): Promise<PromptOptimizerSettingsView>",
					summary: "Update plugin settings when the request has not been cancelled.",
					jsDoc: "/** Update plugin settings when the request has not been cancelled. */"
				},
				{
					kind: "method",
					name: "listRoutes",
					signature: "listRoutes(): Promise<ModelRoute[]>",
					summary: "List models already registered in dsh.",
					jsDoc: "/** List models already registered in dsh. */"
				},
				{
					kind: "method",
					name: "resolveModelEfforts",
					signature: "resolveModelEfforts(provider: string, model: string): Promise<{ efforts: readonly ReasoningEffortInfo[]; defaultEffort?: string }>",
					summary: "Resolve reasoning-effort tiers for one route (lazy).",
					jsDoc: "/** Resolve reasoning-effort tiers for one route (lazy). */"
				},
				{
					kind: "method",
					name: "optimize",
					signature: "optimize(text: string, provider: string, model: string, context: string, signal: AbortSignal): Promise<string>",
					summary: "Optimize one prompt through a selected dsh route.",
					jsDoc: "/** Optimize one prompt through a selected dsh route. */"
				}
			],
			types: [
				{
					name: "PromptOptimizerSettingsView",
					declaration: "export interface PromptOptimizerSettingsView { available: boolean; writable: boolean; settings: PromptOptimizerSettings; overridden: string[]; defaultOptimizePrompt: string }"
				},
				{
					name: "PromptOptimizerSettingsPatch",
					declaration: "export type PromptOptimizerSettingsPatch = Partial<PromptOptimizerSettings>"
				},
				{
					name: "ModelRoute",
					declaration: "export interface ReasoningEffortInfo { id: string; name: string; description?: string } export interface ModelRoute { provider: string; providerName: string; model: string; modelName: string; reasoningEfforts: readonly ReasoningEffortInfo[]; defaultReasoningEffort?: string }"
				}
			]
		}],
		events: [],
		objects: []
	}
};
//#endregion
export { TYPERT, TYPERT as default };

//# sourceMappingURL=typert.js.map