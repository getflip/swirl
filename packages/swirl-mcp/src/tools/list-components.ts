import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../artifact-library";
import { ComponentCategory } from "../types";

export type LoadLibrary = (version: string) => Promise<ArtifactLibrary>;

const VERSION_DESCRIPTION =
  "The @getflip/swirl-components version installed in the project. " +
  "Read the user's package.json or node_modules/@getflip/swirl-components/package.json to find this.";

export function registerListComponents(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  registerListTool(
    server,
    loadLibrary,
    "list_components",
    "List all Swirl design system UI components (buttons, modals, forms, etc.) with brief summaries and related components. " +
      "Does NOT include icons or symbols — use list_icons or list_symbols for those. " +
      "Use get_component_details for full props, events, slots, and examples. " +
      "IMPORTANT: First read the user's package.json to determine their installed @getflip/swirl-components version, then pass it as the 'version' parameter.",
    "core"
  );
}

export function registerListIcons(server: McpServer, loadLibrary: LoadLibrary) {
  registerListTool(
    server,
    loadLibrary,
    "list_icons",
    "List all Swirl icon components (swirl-icon-*). " +
      "Use get_component_details for full details on a specific icon. " +
      "IMPORTANT: First read the user's package.json to determine their installed @getflip/swirl-components version, then pass it as the 'version' parameter.",
    "icon"
  );
}

export function registerListSymbols(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  registerListTool(
    server,
    loadLibrary,
    "list_symbols",
    "List all Swirl symbol components (swirl-symbol-*). " +
      "Use get_component_details for full details on a specific symbol. " +
      "IMPORTANT: First read the user's package.json to determine their installed @getflip/swirl-components version, then pass it as the 'version' parameter.",
    "symbol"
  );
}

function registerListTool(
  server: McpServer,
  loadLibrary: LoadLibrary,
  name: string,
  description: string,
  category: ComponentCategory
) {
  server.registerTool(
    name,
    {
      description,
      inputSchema: {
        version: z.string().describe(VERSION_DESCRIPTION),
      },
    },
    // @ts-ignore - MCP SDK + zod 3.x causes excessively deep type instantiation
    async ({ version }: { version: string }) => {
      const lib = await loadLibrary(version);
      const components = lib.getByCategory(category);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(components) }],
      };
    }
  );
}
