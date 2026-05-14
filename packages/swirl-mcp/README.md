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

## Local testing

### stdio

```sh
npx @modelcontextprotocol/inspector node dist/transports/stdio.js
```

### HTTP

Start the server, then open the Inspector and connect with transport type
"Streamable HTTP" and URL `http://localhost:3000/mcp`:

```sh
npx tsx src/transports/http.ts
npx @modelcontextprotocol/inspector
```

## Tools

| Tool                      | Description                                                                  |
| ------------------------- | ---------------------------------------------------------------------------- |
| **list_components**       | Lists all Swirl UI components with brief summaries and related components.   |
| **list_icons**            | Lists all Swirl icon components.                                             |
| **list_symbols**          | Lists all Swirl symbol components.                                           |
| **get_component_details** | Full component docs: props, events, slots, examples, and accessibility info. |
| **get_component_source**  | Versioned original TSX and CSS source for a specific component.              |
| **get_started**           | Installation and setup guide for Web Components, Angular, and React.         |

All tools accept a `version` parameter matching the installed
`@getflip/swirl-components` version.

## How it works

Component metadata and documentation are fetched at runtime from
`@getflip/swirl-ai` artifacts on the unpkg CDN. Versioned component source is
fetched from matching `@getflip/swirl-components@<version>` tags in the Swirl
GitHub repository. Loaded libraries are cached in-memory to avoid redundant
fetches.
