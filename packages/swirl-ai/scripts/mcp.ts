import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { ArtifactLibrary, resolveAgentDir } from "../lib/mcp/data-loader.js";
import {
  registerListComponents,
  registerListIcons,
  registerListSymbols,
  registerListEmojis,
} from "../lib/mcp/tools/list-components.js";
import { registerGetComponentDetails } from "../lib/mcp/tools/get-component-details.js";

async function main() {
  const agentDir = resolveAgentDir();
  console.error(`Loading artifacts from: ${agentDir}`);

  const lib = new ArtifactLibrary(agentDir);
  console.error(`Loaded ${lib.totalCount} components`);

  const server = new McpServer({
    name: "swirl-ai",
    version: "0.1.0",
  });

  registerListComponents(server, lib);
  registerListIcons(server, lib);
  registerListSymbols(server, lib);
  registerListEmojis(server, lib);
  registerGetComponentDetails(server, lib);

  await server.connect(new StdioServerTransport());

  console.error("Swirl AI MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
