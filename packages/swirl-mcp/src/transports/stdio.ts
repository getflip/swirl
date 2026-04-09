import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createMcpServer } from "../create-server.js";

async function main() {
  const server = createMcpServer();

  await server.connect(new StdioServerTransport());

  console.error("Swirl MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
