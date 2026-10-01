import { type PromptOptimizerSettings, type PromptOptimizerSettingsPatch, type PromptOptimizerSettingsView, type ModelRoute, type ReasoningEffortInfo } from '../config.js';
import type { PromptOptimizerRemote } from '../remote.js';
export type SettingsStatus = 'loading' | 'ready' | 'error';
/** Small read-only face handed to slot components so they can read the
 * current settings without owning the controller. */
export type SettingsFace = {
    readonly status: 'loading' | 'ready' | 'error';
    readonly settings: PromptOptimizerSettings;
};
export type SettingsSnapshot = {
    readonly status: SettingsStatus;
    readonly view: PromptOptimizerSettingsView;
    readonly detail: string;
};
export type RoutesSnapshot = {
    readonly status: 'loading' | 'ready' | 'error';
    readonly routes: readonly ModelRoute[];
    readonly detail: string;
};
/** Keyed by `${provider}\u0000${model}` — undefined effort = loading requested,
 *  null effort = load failed, object = resolved efforts. */
export type EffortsSnapshot = Readonly<Record<string, EffortsEntry>>;
export type EffortsEntry = {
    readonly status: 'loading' | 'ready' | 'error';
    readonly efforts: readonly ReasoningEffortInfo[];
    readonly defaultEffort?: string;
    readonly detail: string;
};
type Listener = () => void;
/**
 * Settings read/write controller for the settings page and the optimize
 * button. Owns the remote calls and a simple external store so both the page
 * and the button observe the same values. Also caches per-model reasoning-
 * effort metadata loaded lazily through resolveModelEfforts so opening the
 * effort dropdown never double-fetches across renders.
 */
export declare class SettingsController {
    private readonly remote;
    private settingsSnapshot;
    private routesSnapshot;
    private effortsSnapshot;
    private readonly listeners;
    private disposed;
    constructor(remote: PromptOptimizerRemote);
    readonly getSettingsSnapshot: () => SettingsSnapshot;
    readonly getRoutesSnapshot: () => RoutesSnapshot;
    readonly getEffortsSnapshot: () => EffortsSnapshot;
    readonly subscribe: (listener: Listener) => (() => void);
    refreshSettings(): Promise<void>;
    refreshRoutes(): Promise<void>;
    private readonly autoPopulateDefaultRoutesIfNeeded;
    update(patch: PromptOptimizerSettingsPatch): Promise<boolean>;
    /**
     * Lazily fetch reasoning efforts for a route. Results are cached in the
     * controller so changing the effort dropdown back and forth doesn't
     * re-trigger remote calls. Returns a snapshot entry immediately — the
     * caller subscribes via `useEffortsSnapshot` to re-render when the data
     * lands.
     */
    ensureEffortsFor(provider: string, model: string): Promise<void>;
    dispose(): void;
    private emit;
}
export declare function useSettingsSnapshot(controller: SettingsController): SettingsSnapshot;
export declare function useRoutesSnapshot(controller: SettingsController): RoutesSnapshot;
export declare function useEffortsSnapshot(controller: SettingsController): EffortsSnapshot;
export {};
