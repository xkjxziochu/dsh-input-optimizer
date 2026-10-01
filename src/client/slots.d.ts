/**
 * Host-provided `slots` service type.
 *
 * No shipped client package augments `ctx.slots` in the 0.2.0 track, so the
 * slot-registry service must be declared locally. Reuse the pure slot
 * registry's strongly-typed `register` contract (`SlotCore`) and add the
 * host's nested `inject(name, contribute)` wiring face used by this plugin's
 * `apply`.
 */
import type { SlotCore } from '@deepseek-ai/dsh-client-ui-slots'

interface PromptOptimizerSlotsService extends SlotCore {
  inject(name: string, contribute: () => unknown): unknown
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    slots: PromptOptimizerSlotsService
  }
}