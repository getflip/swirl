---
"@getflip/swirl-mcp": patch
---

Fix a startup crash (`ERR_PACKAGE_PATH_NOT_EXPORTED`) by bumping zod to 3.25.76, the minimum the bundled MCP SDK's dependency range allows. Earlier versions could resolve a zod too old for the SDK, depending on how the package manager hoisted it.
