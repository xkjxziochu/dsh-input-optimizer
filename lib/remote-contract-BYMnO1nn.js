import { z } from "zod";
//#region src/remote-contract.ts
const textSchema = z.string();
const promptOptimizerSettingsSchema = z.object({
	optimizeProvider: z.string(),
	optimizeModel: z.string(),
	optimizeReasoningEffort: z.string(),
	optimizePrompt: z.string(),
	contextTurns: z.number()
});
const promptOptimizerSettingsPatchSchema = z.object({
	optimizeProvider: z.string().optional(),
	optimizeModel: z.string().optional(),
	optimizeReasoningEffort: z.string().optional(),
	optimizePrompt: z.string().optional(),
	contextTurns: z.number().optional()
});
const promptOptimizerSettingsViewSchema = z.object({
	available: z.boolean(),
	writable: z.boolean(),
	settings: promptOptimizerSettingsSchema,
	overridden: z.array(z.string()),
	defaultOptimizePrompt: z.string()
});
const reasoningEffortSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional()
});
const resolveModelEffortsResultSchema = z.object({
	efforts: z.array(reasoningEffortSchema),
	defaultEffort: z.string().optional()
});
const modelRouteSchema = z.object({
	provider: z.string(),
	providerName: z.string(),
	model: z.string(),
	modelName: z.string(),
	reasoningEfforts: z.array(reasoningEffortSchema),
	defaultReasoningEffort: z.string().optional()
});
const listRoutesResultSchema = z.array(modelRouteSchema);
const optimizeResultSchema = z.string();
//#endregion
export { resolveModelEffortsResultSchema as a, promptOptimizerSettingsViewSchema as i, optimizeResultSchema as n, textSchema as o, promptOptimizerSettingsPatchSchema as r, listRoutesResultSchema as t };

//# sourceMappingURL=remote-contract-BYMnO1nn.js.map