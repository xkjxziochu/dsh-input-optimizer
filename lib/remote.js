import { a as resolveModelEffortsResultSchema, i as promptOptimizerSettingsViewSchema, n as optimizeResultSchema, o as textSchema, r as promptOptimizerSettingsPatchSchema, t as listRoutesResultSchema } from "./remote-contract-BYMnO1nn.js";
//#region src/remote.ts
const TYPERT_REMOTE = {
	package: "dsh-input-optimizer",
	descriptors: [
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
	]
};
//#endregion
export { TYPERT_REMOTE, TYPERT_REMOTE as default };

//# sourceMappingURL=remote.js.map