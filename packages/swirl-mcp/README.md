# @getflip/swirl-mcp

MCP server that lets AI agents discover and use [Swirl Design System](https://getflip.dev) components.

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
      "url": "https://swirl-mcp.getflip.tech/mcp"
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

Start the server, then open the Inspector and connect with transport type "Streamable HTTP" and URL `http://localhost:3000/mcp`:

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
| **list_emojis**           | Lists all Swirl emoji components.                                            |
| **get_component_details** | Full component docs: props, events, slots, examples, and accessibility info. |
| **get_started**           | Installation and setup guide for Web Components, Angular, and React.         |

All tools accept a `version` parameter matching the installed `@getflip/swirl-components` version.

## How it works

Component metadata and documentation are fetched at runtime from `@getflip/swirl-ai` artifacts on the unpkg CDN. Loaded libraries are cached in-memory to avoid redundant fetches.
