import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../data-loader";

export function registerGetStarted(server: McpServer, lib: ArtifactLibrary) {
  server.registerTool(
    "get_started",
    {
      description:
        "Get installation and setup instructions for Swirl components. " +
        "Covers Web Components, Angular, and React wrapper libraries.",
    },
    async () => {
      const markdown = lib.getGuide("get-started");
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
