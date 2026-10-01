/**
 * Bilingual UI strings for dsh-input-optimizer (zh/en). Registered as one
 * namespace into the DSH locale runtime; every slot component declares that
 * namespace and reads copy through the framework-injected `t` seat, so the
 * UI follows the DSH settings language switch automatically.
 */
export type PromptOptimizerStrings = {
  settingsTitle: string
  settingsDescription: string
  loading: string
  saveFailed: string
  modelNone: string
  showDefaultPrompt: string
  hideDefaultPrompt: string
  effortDefaultLabel: string
  effortLoadingLabel: string
  routesStatus: string
  routesUnavailable: string
  optimizeButton: string
  optimizeBusy: string
  optimizeFailed: string
  optimizeEmpty: string
  optimizePanelTitle: string
  optimizeOriginalLabel: string
  optimizeOptimizedLabel: string
  optimizeAdopt: string
  optimizeCancel: string
  optimizeNotConfigured: string
  optimizeSectionLabel: string
  optimizeModelLabel: string
  optimizeModelHint: string
  optimizeEffortLabel: string
  optimizeEffortHint: string
  optimizePromptLabel: string
  optimizePromptHint: string
  optimizePromptPlaceholder: string
  contextTurnsLabel: string
  contextTurnsHint: string
}

export const zh: PromptOptimizerStrings = {
  settingsTitle: '提示词优化设置',
  settingsDescription: '配置提示词优化使用的模型。优化复用你在 dsh 设置里已配置的模型路由，无需额外 API key。',
  loading: '加载中…',
  saveFailed: '保存失败，请重试',
  modelNone: '（未选择）',
  showDefaultPrompt: '查看内置提示词',
  hideDefaultPrompt: '收起内置提示词',
  effortDefaultLabel: '默认（关闭思考）',
  effortLoadingLabel: '加载思考强度选项…',
  routesStatus: '可用模型路由',
  routesUnavailable: '不可用',
  optimizeButton: '优化提示词',
  optimizeBusy: '优化中…',
  optimizeFailed: '优化失败，请重试',
  optimizeEmpty: '输入框为空，无需优化',
  optimizePanelTitle: '提示词优化结果',
  optimizeOriginalLabel: '原文',
  optimizeOptimizedLabel: '优化后',
  optimizeAdopt: '采纳',
  optimizeCancel: '取消',
  optimizeNotConfigured: '未配置优化模型，请在设置页选择',
  optimizeSectionLabel: '提示词优化',
  optimizeModelLabel: '优化模型',
  optimizeModelHint: '选择 dsh 中已配置的模型路由。',
  optimizeEffortLabel: '优化思考强度',
  optimizeEffortHint: '控制大模型的推理深度。默认即适配器最低档，适合大多数场景。',
  optimizePromptLabel: '自定义优化提示词',
  optimizePromptHint: '留空使用内置提示词。自定义提示词总是追加输出契约保护。',
  optimizePromptPlaceholder: '可选：粘贴自定义提示词…',
  contextTurnsLabel: '上下文引用轮数',
  contextTurnsHint: '优化时引用最近 N 轮对话作为上下文，0 为禁用。默认 3 轮。'
}

export const en: PromptOptimizerStrings = {
  settingsTitle: 'Prompt Optimizer Settings',
  settingsDescription: 'Configure the model used for prompt optimization. It reuses the model routes already configured in dsh — no extra API key needed.',
  loading: 'Loading…',
  saveFailed: 'Failed to save, please retry',
  modelNone: '(none)',
  showDefaultPrompt: 'Show the built-in prompt',
  hideDefaultPrompt: 'Hide the built-in prompt',
  effortDefaultLabel: 'Default (thinking off)',
  effortLoadingLabel: 'Loading reasoning effort options…',
  routesStatus: 'Available model routes',
  routesUnavailable: 'unavailable',
  optimizeButton: 'Optimize prompt',
  optimizeBusy: 'Optimizing…',
  optimizeFailed: 'Optimization failed, please retry',
  optimizeEmpty: 'Input is empty, nothing to optimize',
  optimizePanelTitle: 'Prompt optimization result',
  optimizeOriginalLabel: 'Original',
  optimizeOptimizedLabel: 'Optimized',
  optimizeAdopt: 'Adopt',
  optimizeCancel: 'Cancel',
  optimizeNotConfigured: 'No optimize model configured, pick one in Settings',
  optimizeSectionLabel: 'Prompt optimization',
  optimizeModelLabel: 'Optimize model',
  optimizeModelHint: 'Pick a model route already configured in dsh.',
  optimizeEffortLabel: 'Optimize thinking effort',
  optimizeEffortHint: 'Controls the model inference depth. Default uses the adapter baseline (lightest tier).',
  optimizePromptLabel: 'Custom optimize prompt',
  optimizePromptHint: 'Empty uses the built-in prompt. A custom prompt always keeps the output-contract guard.',
  optimizePromptPlaceholder: 'Optional: paste a custom prompt…',
  contextTurnsLabel: 'Context turns',
  contextTurnsHint: 'Include recent N turns as context for optimization. 0 = disabled. Default 3.'
}

/** Namespace owning every prompt-optimizer surface string. Registered into
 * the DSH locale runtime; slots declaring this namespace receive the typed `t`. */
export const PROMPT_OPTIMIZER_NS = 'prompt-optimizer'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  /** Prompt-optimizer dictionary keys (one shared key set, zh/en bilingual). */
  interface LocaleNamespaceMap {
    'prompt-optimizer': keyof PromptOptimizerStrings
  }
}
