import { z } from 'zod';
export declare const textSchema: z.ZodString;
export declare const promptOptimizerSettingsSchema: z.ZodObject<{
    optimizeProvider: z.ZodString;
    optimizeModel: z.ZodString;
    optimizeReasoningEffort: z.ZodString;
    optimizePrompt: z.ZodString;
    contextTurns: z.ZodNumber;
}, z.core.$strip>;
export declare const promptOptimizerSettingsPatchSchema: z.ZodObject<{
    optimizeProvider: z.ZodOptional<z.ZodString>;
    optimizeModel: z.ZodOptional<z.ZodString>;
    optimizeReasoningEffort: z.ZodOptional<z.ZodString>;
    optimizePrompt: z.ZodOptional<z.ZodString>;
    contextTurns: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const promptOptimizerSettingsViewSchema: z.ZodObject<{
    available: z.ZodBoolean;
    writable: z.ZodBoolean;
    settings: z.ZodObject<{
        optimizeProvider: z.ZodString;
        optimizeModel: z.ZodString;
        optimizeReasoningEffort: z.ZodString;
        optimizePrompt: z.ZodString;
        contextTurns: z.ZodNumber;
    }, z.core.$strip>;
    overridden: z.ZodArray<z.ZodString>;
    defaultOptimizePrompt: z.ZodString;
}, z.core.$strip>;
export declare const reasoningEffortSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const resolveModelEffortsResultSchema: z.ZodObject<{
    efforts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    defaultEffort: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const modelRouteSchema: z.ZodObject<{
    provider: z.ZodString;
    providerName: z.ZodString;
    model: z.ZodString;
    modelName: z.ZodString;
    reasoningEfforts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    defaultReasoningEffort: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const listRoutesResultSchema: z.ZodArray<z.ZodObject<{
    provider: z.ZodString;
    providerName: z.ZodString;
    model: z.ZodString;
    modelName: z.ZodString;
    reasoningEfforts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    defaultReasoningEffort: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export declare const optimizeResultSchema: z.ZodString;
export type PromptOptimizerSettingsWire = z.infer<typeof promptOptimizerSettingsSchema>;
export type PromptOptimizerSettingsPatchWire = z.infer<typeof promptOptimizerSettingsPatchSchema>;
export type PromptOptimizerSettingsViewWire = z.infer<typeof promptOptimizerSettingsViewSchema>;
export type ModelRouteWire = z.infer<typeof modelRouteSchema>;
export type ReasoningEffortWire = z.infer<typeof reasoningEffortSchema>;
export type ResolveModelEffortsResultWire = z.infer<typeof resolveModelEffortsResultSchema>;
export type { PromptOptimizerSettings, PromptOptimizerSettingsPatch, PromptOptimizerSettingsView, ModelRoute, ReasoningEffortInfo } from './config.js';
