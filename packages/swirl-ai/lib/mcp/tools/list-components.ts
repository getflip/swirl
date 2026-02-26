import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../data-loader";
import { ComponentCategory } from "../../types";

export function registerListComponents(
  server: McpServer,
  lib: ArtifactLibrary
) {
  registerListTool(
    server,
    lib,
    "list_components",
    "List all Swirl design system UI components (buttons, modals, forms, etc.) with brief summaries and related components. " +
      "Does NOT include icons, symbols, or emojis — use list_icons, list_symbols, or list_emojis for those. " +
      "Use get_component_details for full props, events, slots, and examples.",
    "core"
  );
}

export function registerListIcons(server: McpServer, lib: ArtifactLibrary) {
  registerListTool(
    server,
    lib,
    "list_icons",
    "List all Swirl icon components (swirl-icon-*). " +
      "Use get_component_details for full details on a specific icon.",
    "icon"
  );
}

export function registerListSymbols(server: McpServer, lib: ArtifactLibrary) {
  registerListTool(
    server,
    lib,
    "list_symbols",
    "List all Swirl symbol components (swirl-symbol-*). " +
      "Use get_component_details for full details on a specific symbol.",
    "symbol"
  );
}

export function registerListEmojis(server: McpServer, lib: ArtifactLibrary) {
  registerListTool(
    server,
    lib,
    "list_emojis",
    "List all Swirl emoji components (swirl-emoji-*). " +
      "Use get_component_details for full details on a specific emoji.",
    "emoji"
  );
}

function registerListTool(
  server: McpServer,
  lib: ArtifactLibrary,
  name: string,
  description: string,
  category: ComponentCategory
) {
  server.registerTool(name, { description }, async () => {
    const components = lib.getByCategory(category);
    return {
      content: [{ type: "text" as const, text: JSON.stringify(components) }],
    };
  });
}
