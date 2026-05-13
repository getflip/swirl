import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../artifact-library";

export type LoadLibrary = (version: string) => Promise<ArtifactLibrary>;

const VERSION_DESCRIPTION =
  "The @getflip/swirl-components version installed in the project. " +
  "Read the user's package.json or node_modules/@getflip/swirl-components/package.json to find this.";

export function registerGetComponentDetails(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  server.registerTool(
    "get_component_details",
    {
      description:
        "Get full details for a Swirl component including all props with types and defaults, " +
        "events, methods, slots, accessibility info, and usage examples.",
      inputSchema: {
        tag: z.string().describe('The component tag name, e.g. "swirl-button"'),
        version: z.string().describe(VERSION_DESCRIPTION),
      },
    },
    // @ts-ignore - MCP SDK + zod 3.x causes excessively deep type instantiation
    async ({ tag, version }: { tag: string; version: string }) => {
      const lib = await loadLibrary(version);

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

      const markdown = await lib.getComponentMarkdown(tag);
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
