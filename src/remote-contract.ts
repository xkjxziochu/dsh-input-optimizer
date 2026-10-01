import { z } from 'zod'
import type { PromptOptimizerSettings, PromptOptimizerSettingsPatch, PromptOptimizerSettingsView, ModelRoute } from './config.js'

export const textSchema = z.string()

export const promptOptimizerSettingsSchema = z.object({
  optimizeProvider: z.string(),
  optimizeModel: z.string(),
  optimizeReasoningEffort: z.string(),
  optimizePrompt: z.string(),
  contextTurns: z.number()
})

export const promptOptimizerSettingsPatchSchema = z.object({
  optimizeProvider: z.string().optional(),
  optimizeModel: z.string().optional(),
  optimizeReasoningEffort: z.string().optional(),
  optimizePrompt: z.string().optional(),
  contextTurns: z.number().optional()
})

export const promptOptimizerSettingsViewSchema = z.object({
  available: z.boolean(),
  writable: z.boolean(),
  settings: promptOptimizerSettingsSchema,
  overridden: z.array(z.string()),
  defaultOptimizePrompt: z.string()
})

export const reasoningEffortSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional()
})

export const resolveModelEffortsResultSchema = z.object({
  efforts: z.array(reasoningEffortSchema),
  defaultEffort: z.string().optional()
})

export const modelRouteSchema = z.object({
  provider: z.string(),
  providerName: z.string(),
  model: z.string(),
  modelName: z.string(),
  reasoningEfforts: z.array(reasoningEffortSchema),
  defaultReasoningEffort: z.string().optional()
})

export const listRoutesResultSchema = z.array(modelRouteSchema)

export const optimizeResultSchema = z.string()

export type PromptOptimizerSettingsWire = z.infer<typeof promptOptimizerSettingsSchema>
export type PromptOptimizerSettingsPatchWire = z.infer<typeof promptOptimizerSettingsPatchSchema>
export type PromptOptimizerSettingsViewWire = z.infer<typeof promptOptimizerSettingsViewSchema>
export type ModelRouteWire = z.infer<typeof modelRouteSchema>
export type ReasoningEffortWire = z.infer<typeof reasoningEffortSchema>
export type ResolveModelEffortsResultWire = z.infer<typeof resolveModelEffortsResultSchema>
export type { PromptOptimizerSettings, PromptOptimizerSettingsPatch, PromptOptimizerSettingsView, ModelRoute, ReasoningEffortInfo } from './config.js'
