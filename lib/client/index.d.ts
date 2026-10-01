import type { Context as ClientContext } from '@deepseek-ai/cordis';
/** Required Client services: the slot registry, the Typert remote hub, and
 * the DSH locale runtime. `remote.promptOptimizer` is mounted by this
 * plugin's own apply() via `ctx.remote.$mount`, so it MUST NOT appear here —
 * the outer inject gates plugin activation and would deadlock waiting for
 * itself. It is declared only on the inner ctx.inject() below, which runs
 * after the mount. */
export declare const inject: string[];
export declare function apply(ctx: ClientContext): Promise<() => Promise<void>>;
