# @getflip/swirl-mcp

MCP server that lets AI agents discover and use
[Swirl Design System](https://getflip.dev) components.

## Setup

### Local (stdio)

Add to your MCP settings:

```json
{
  "mcpServers": {
    "swirl": {
      "command": "npx",
      "args": ["-y", "@getflip/swirl-mcp"]
    }
  }
}
```

### Remote (HTTP)

```json
{
  "mcpServers": {
    "swirl": {
      "url": "https://swirl-mcp.engage.team.getflip.gg/mcp"
    }
  }
}
```

## Local development

Inspect the server with the
[MCP Inspector](https://github.com/modelcontextprotocol/inspector) over either
transport. Prepend `SWIRL_AI_LOCAL=1` to either command to load artifacts
from the local monorepo instead of the unpkg CDN.

### stdio

```sh
SWIRL_AI_LOCAL=1 npx @modelcontextprotocol/inspector node dist/transports/stdio.js
```

### HTTP

Start the server, then open the Inspector and connect with transport type
"Streamable HTTP" and URL `http://localhost:3000/mcp`:

```sh
SWIRL_AI_LOCAL=1 npx tsx src/transports/http.ts
npx @modelcontextprotocol/inspector
```

### `SWIRL_AI_LOCAL`

When set, agent artifacts are read from `packages/swirl-ai/dist/agent` and
component source (`get_component_source`) is read from
`packages/swirl-components/src/components/<tag>/<tag>.{tsx,css}`. The
`version` parameter is ignored for cache keying. Make sure swirl-ai has been
built (`pnpm --filter @getflip/swirl-ai build`).

## Tools

| Tool                         | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **list_components**          | Lists all Swirl UI components with brief summaries and related components.   |
| **list_icons**               | Lists all Swirl icon components.                                             |
| **list_symbols**             | Lists all Swirl symbol components.                                           |
| **get_component_details**    | Full component docs: props, events, slots, examples, and accessibility info. |
| **get_component_source**     | Versioned original TSX and CSS source for a specific component.              |
| **list_color_tokens**        | Lists Swirl color tokens (light + dark) as CSS / SCSS / Tailwind keys.       |
| **list_typography_tokens**   | Lists Swirl typography tokens as CSS / SCSS / Tailwind keys.                 |
| **list_layout_tokens**       | Lists Swirl layout tokens (spacing, radius, shadow, z-index, blur).          |
| **get_started**              | Installation and setup guide for Web Components, Angular, and React.         |

All tools accept a `version` parameter matching the installed
`@getflip/swirl-components` version.

## How it works

Component metadata and documentation are fetched at runtime from
`@getflip/swirl-ai` artifacts on the unpkg CDN. Versioned component source is
fetched from matching `@getflip/swirl-components@<version>` tags in the Swirl
GitHub repository. Loaded libraries are cached in-memory to avoid redundant
fetches.
