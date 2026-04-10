import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../artifact-library";

export type LoadLibrary = (version: string) => Promise<ArtifactLibrary>;

const VERSION_DESCRIPTION =
  "The @getflip/swirl-components version installed in the project. " +
  "Read the user's package.json or node_modules/@getflip/swirl-components/package.json to find this.";

export function registerGetStarted(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  server.registerTool(
    "get_started",
    {
      description:
        "Get installation and setup instructions for Swirl components. " +
        "Covers Web Components, Angular, and React wrapper libraries. " +
        "IMPORTANT: First read the user's package.json to determine their installed @getflip/swirl-components version, then pass it as the 'version' parameter.",
      inputSchema: {
        version: z.string().describe(VERSION_DESCRIPTION),
      },
    },
    async ({ version }: { version: string }) => {
      const lib = await loadLibrary(version);

      const markdown = await lib.getGuide("get-started");
      if (!markdown) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Getting started guide not found.",
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
