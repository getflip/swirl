# @getflip/swirl-ai

Build-time artifacts for AI agents integrating with the Swirl Design System.

> **Looking for the MCP server?** See [`@getflip/swirl-mcp`](../swirl-mcp/).

## Artifacts

Build-time artifacts for agents that prefer direct file access:

| Artifact                     | Path                                 | Purpose                                                          |
| ---------------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| **Agent components index**   | `dist/agent/components-index.json`   | Lean catalog: tag, summary, and related components per entry.    |
| **Per-component docs**       | `dist/agent/components/<tag>.md`     | Full markdown docs: props, events, slots, examples, a11y info.   |
| **Custom elements manifest** | `dist/custom-elements.manifest.json` | Full CEM schema (tags, props, events, slots, descriptions).      |
| **TypeScript types**         | `dist/types/`                        | Type declarations for all components.                            |

### Package exports

- `@getflip/swirl-ai/agent-index` → `dist/agent/components-index.json`
- `@getflip/swirl-ai/manifest` → `dist/custom-elements.manifest.json`

Per-component docs are at `dist/agent/components/<tag>.md`.

## Versioning

Artifacts are generated from `@getflip/swirl-components` at build time. Keep
`@getflip/swirl-ai` and `@getflip/swirl-components` versions in sync.
