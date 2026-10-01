import type { SnapshotSelectorHook, TranslateNS } from '@deepseek-ai/dsh-client-ui-slots';
import type { InputState } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { ChatSnapshot } from '@deepseek-ai/dsh-client-ui-chat/client';
import type { PromptOptimizerRemote } from '../remote.js';
import type { SettingsFace } from './settings-controller.js';
/** The framework-injected `t` seat for the prompt-optimizer namespace. */
type Translate = TranslateNS<'prompt-optimizer'>;
/**
 * Props handed to a `conversation.input.right` entry, plus the injected
 * remote and settings face. The slot standard kit supplies `useChat` (Chat
 * target snapshot, whose `legacy.nodes` carries the message array) and
 * `useInput` (draft).
 */
export type OptimizeButtonProps = {
    readonly useChat: SnapshotSelectorHook<ChatSnapshot>;
    readonly useInput: SnapshotSelectorHook<InputState>;
    readonly inputActions: {
        setDraft(text: string): void;
    };
    readonly remote: PromptOptimizerRemote;
    readonly useSettings: () => SettingsFace;
    readonly t: Translate;
};
/**
 * The ✨ optimize button rendered above the composer card (in
 * `conversation.input.dock`), right-aligned. Click reads the current draft,
 * calls the Host LLM to optimize it, then shows a confirmation panel with
 * the original and optimized text. The draft is replaced only when the user
 * clicks "Adopt".
 */
export declare function OptimizeButton({ useChat, useInput, inputActions, remote, useSettings, t }: OptimizeButtonProps): import("react").JSX.Element;
export {};
