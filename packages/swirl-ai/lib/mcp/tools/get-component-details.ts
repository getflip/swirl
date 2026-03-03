import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../data-loader";

export function registerGetComponentDetails(
  server: McpServer,
  lib: ArtifactLibrary
) {
  server.registerTool(
    "get_component_details",
    {
      description:
        "Get full details for a Swirl component including all props with types and defaults, " +
        "events, methods, slots, accessibility info, and usage examples.",
      inputSchema: {
        tag: z.string().describe('The component tag name, e.g. "swirl-button"'),
      },
    },
    // @ts-expect-error - MCP SDK + zod 3.x causes excessively deep type instantiation
    async ({ tag }: { tag: string }) => {
      const entry = lib.getByTag(tag);
      if (!entry) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Component "${tag}" not found. Use list_components to see available components.`,
            },
          ],
        };
      }

      const markdown = lib.getComponentMarkdown(tag);
      if (!markdown) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Component "${tag}" exists but no detailed documentation was found.`,
            },
          ],
        };
      }

      return {
        content: [{ type: "text" as const, text: markdown }],
      };
    }
  );
}
