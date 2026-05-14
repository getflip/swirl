import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ArtifactLibrary } from "../artifact-library";

export type LoadLibrary = (version: string) => Promise<ArtifactLibrary>;

const VERSION_DESCRIPTION =
  "The @getflip/swirl-components version installed in the project. " +
  "Read the user's package.json or node_modules/@getflip/swirl-components/package.json to find this.";

export function registerGetComponentSource(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  server.registerTool(
    "get_component_source",
    {
      description:
        "Get the versioned original TSX and CSS source files for a Swirl component. " +
        "Use this when behavior, styling, layout, rendering details, debugging, or uncertainty requires the full implementation.",
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

      const source = await lib.getComponentSource(tag);
      const sections = [
        formatSourceSection(tag, "tsx", source.tsx),
        formatSourceSection(tag, "css", source.css),
      ].filter(Boolean);

      if (sections.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text:
                `Component "${tag}" exists but no original source files were found for version "${version}". ` +
                "Make sure the version matches an @getflip/swirl-components release tag.",
            },
          ],
        };
      }

      return {
        content: [{ type: "text" as const, text: sections.join("\n\n") }],
      };
    }
  );
}

function formatSourceSection(
  tag: string,
  extension: "tsx" | "css",
  content: string | undefined
): string | undefined {
  if (!content) {
    return undefined;
  }

  const path = `packages/swirl-components/src/components/${tag}/${tag}.${extension}`;

  return [`## ${path}`, "", `\`\`\`\`${extension}`, content, "````"].join("\n");
}
