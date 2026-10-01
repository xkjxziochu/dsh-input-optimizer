# dsh-input-optimizer

A standalone [dsh](https://github.com/DIAG5) plugin that adds a **✨ 提示词优化**
button to the dsh input box: it rewrites the draft you are typing into a better
prompt using the LLM routes the harness is already configured with, then shows
an 原文 / 优化后 comparison so you decide whether to adopt the rewrite.

Extracted from [`dsh-better-input`](https://github.com/DIAG5/dsh-better-input)
(only the prompt-optimize capability — the voice-recognition chain and the ASR
transcript cleanup are **not** included).

## Feature

- **✨ optimize the input draft.** Click the button next to the send button; the
  current draft is sent to the configured optimize route and the result appears
  in a confirm panel. `采纳` replaces the draft, `取消` keeps it untouched.
- **Uses dsh's own credentials.** No separate API key: the plugin calls
  `ctx.llm`, so it reuses whatever providers the harness already has.
- **Recent conversation as context.** The last N turns (default 3, configurable
  0–20) are passed along so a follow-up like "改成更正式一点" is rewritten in
  context. `0` disables context entirely.

## Settings

Settings live under the plugin's own namespace (`dsh-input-optimizer`) and are
edited from the dsh settings page (settings section 「提示词优化」):

| Field | Meaning |
| --- | --- |
| Optimize provider / model | The route used for rewriting. Auto-filled with the first available route on first open. |
| Reasoning effort | Effort tier for the rewrite; empty means "thinking off" (the model's `off` tier when advertised, otherwise the adapter default). |
| Custom optimize prompt | Replaces the built-in system prompt entirely. Empty uses the built-in. |
| Context turns | How many recent turns to include as context, 0–20. |

The plugin's settings namespace is derived from its exported `Config` schema, so
every field is declared `.volatile()` — that is what makes the entry visible to
dsh-settings and editable live.

## Install

### From npm (recommended)

```bash
dsh plugin --profile <profile> add dsh-input-optimizer
```

### From a git checkout

```bash
git clone https://github.com/xkjxziochu/dsh-input-optimizer.git
cd dsh-input-optimizer && pnpm install && pnpm build
```

then add `"dsh-input-optimizer": "file:/path/to/dsh-input-optimizer"` to the
profile's `package.json` dependencies, add `dsh-input-optimizer` to its
`dsh.profile.bundles` list, and reinstall.

### What the package installs

It ships a `cordis.patch.yml` (declared as `dsh.bundle.patch`) that inserts the
plugin into the profile:

```yaml
- insert:
    - id: dsh-input-optimizer
      name: dsh-input-optimizer
```

## Build

```bash
pnpm install
pnpm build     # tsdown (host esm + browser cjs bundle) + tsc declarations
pnpm check     # tsc --noEmit
```

Layout:

- `src/index.ts` — host entry (`name` / `Config` / `apply`).
- `src/optimize/service.ts` — the `PromptOptimizer` Typert remote service
  (`getSettings` / `updateSettings` / `listRoutes` / `resolveModelEfforts` /
  `optimize`).
- `src/client.ts` → `lib/client.js` — the browser half (button + confirm panel +
  settings section).
- `src/remote.ts` — the Typert descriptor contribution.

## Requirements

dsh `^0.2.0-rc.1`. The 0.2 line changed two things this plugin depends on: the
Typert codec is now `{ create: () => schema }` instead of `{ schema }`, and
dsh-settings replaced `register()` with a `Config`-derived namespace plus
`describe()` / `update()`.
