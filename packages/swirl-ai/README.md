# @getflip/swirl-ai

Swirl Design System artifacts for AI agents: a compact component index,
per-component docs, and the full custom elements manifest with TypeScript types.

## Artifacts (after `npm run build`)

| Artifact                     | Path                                 | Purpose                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Custom elements manifest** | `dist/custom-elements.manifest.json` | Full CEM schema (tags, props, events, slots, descriptions). Use when you need complete API detail.                                                                                              |
| **Agent components index**   | `dist/agent/components-index.json`   | Compact, agent-oriented list: tag, summary, required/optional props, events, slots, methods, a11y hints, related components. Prefer this for “which component?” and quick lookup.               |
| **Per-component docs**       | `dist/agent/components/<tag>.md`     | One markdown file per component: purpose, required/optional props, slots, events, methods, composition, accessibility, minimal example, common mistakes. Use for retrieval and code generation. |
| **TypeScript types**         | `dist/types/`                        | Declarations for all components (props, events, methods). Use for type-checking and IDE support.                                                                                                |

## Recommended retrieval order for agents

1. **Discover** – Load `dist/agent/components-index.json` to choose components
   by summary and related components.
2. **Detail** – For each chosen tag, load `dist/agent/components/<tag>.md` for
   usage, composition, and examples.
3. **Precision** – If needed, use `dist/custom-elements.manifest.json` or
   `dist/types/` for exact types and full API.

## Package exports

Consumers can resolve these paths from `@getflip/swirl-ai`:

- `@getflip/swirl-ai/manifest` → `dist/custom-elements.manifest.json`
- `@getflip/swirl-ai/agent-index` → `dist/agent/components-index.json`

Per-component docs are under `dist/agent/components/` (e.g.
`node_modules/@getflip/swirl-ai/dist/agent/components/swirl-accordion.md`).
Resolve via your bundler or file system relative to the package root.

## Agent index schema

`components-index.json` has `schemaVersion: 1` and a `components` array. Each
entry includes:

- `tag`, `summary`, `whenToUse`, `requiredProps`, `optionalProps`
- `events`, `slots`, `methods`
- `accessibilityInfo`, `compositionRules`, `relatedComponents`, `status`
  (`stable` | `deprecated` | `experimental`)

Schema and field semantics are stable within major package versions; new
optional fields may be added.

## Versioning

Artifacts are generated from `@getflip/swirl-components` at build time. Keep
`@getflip/swirl-ai` and `@getflip/swirl-components` versions in sync so the
index and docs match the installed components.
