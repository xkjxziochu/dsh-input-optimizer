import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots';
import type { SettingsController } from './settings-controller.js';
/** The framework-injected `t` seat for the prompt-optimizer namespace. */
type Translate = TranslateNS<'prompt-optimizer'>;
export type SettingsSectionProps = {
    readonly close: () => void;
    readonly t: Translate;
    readonly settingsController: SettingsController;
};
/**
 * The prompt-optimizer settings page. Every field edits a local draft and
 * saves on blur/change.
 */
export declare function PromptOptimizerSettingsSection({ settingsController, t }: SettingsSectionProps): import("react").JSX.Element;
export {};
