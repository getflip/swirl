import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ArtifactLibrary } from "../artifact-library";
import { TokenCategory, TokenEntry } from "../types";

export type LoadLibrary = (version: string) => Promise<ArtifactLibrary>;

type TokenFormat = "css" | "scss" | "tailwind";

const VERSION_DESCRIPTION =
  "The @getflip/swirl-components version installed in the project. " +
  "Read the user's package.json or node_modules/@getflip/swirl-components/package.json to find this.";

const FORMAT_DESCRIPTION =
  "Output format for the token key. " +
  "'css' - CSS custom property. " +
  "'scss' - SCSS variable. " +
  "'tailwind' - returns `key: '{name}'` + `namespace` (e.g. 'colors', 'fontSize', 'spacing') so the agent can build the right utility class. " +
  "Pick the format that matches the project's styling stack.";

export function registerListColorTokens(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  registerListTokensTool(
    server,
    loadLibrary,
    "list_color_tokens",
    "List Swirl color tokens with light + dark values. " +
      "Pass 'format' to choose css / scss / tailwind output. For tailwind, all colors use the 'colors' namespace (e.g. `text-{name}`, `bg-{name}`, `border-{name}`). " +
      "Prefer these over hard-coded hex/rgb values.",
    "colors"
  );
}

export function registerListTypographyTokens(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  registerListTokensTool(
    server,
    loadLibrary,
    "list_typography_tokens",
    "List Swirl typography tokens. " +
      "Pass 'format' to choose css / scss / tailwind output. " +
      "Prefer these over ad-hoc font sizes/weights.",
    "typography"
  );
}

export function registerListLayoutTokens(
  server: McpServer,
  loadLibrary: LoadLibrary
) {
  registerListTokensTool(
    server,
    loadLibrary,
    "list_layout_tokens",
    "List Swirl layout tokens (spacing, border radius, border width, box shadows, z-index, blur). " +
      "Pass 'format' to choose css / scss / tailwind output. " +
      "Prefer these over arbitrary px/rem values.",
    "layout"
  );
}

function registerListTokensTool(
  server: McpServer,
  loadLibrary: LoadLibrary,
  name: string,
  description: string,
  category: TokenCategory
) {
  server.registerTool(
    name,
    {
      description,
      inputSchema: {
        version: z.string().describe(VERSION_DESCRIPTION),
        format: z
          .enum(["css", "scss", "tailwind"])
          .describe(FORMAT_DESCRIPTION),
      },
    },
    // @ts-ignore - MCP SDK + zod 3.x causes excessively deep type instantiation
    async ({ version, format }: { version: string; format: TokenFormat }) => {
      const lib = await loadLibrary(version);
      const tokens = lib.getTokensByCategory(category);
      const formatted = tokens
        .map((t) => formatToken(t, format))
        .filter((t): t is FormattedToken => t !== null);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(formatted) }],
      };
    }
  );
}

interface FormattedToken {
  key: string;
  namespace?: string;
  value?: unknown;
  valueLight?: unknown;
  valueDark?: unknown;
  description?: string;
}

function formatToken(
  token: TokenEntry,
  format: TokenFormat
): FormattedToken | null {
  if (format === "tailwind" && !token.tailwindNamespace) {
    return null;
  }

  const out: FormattedToken = { key: tokenKey(token, format) };

  if (format === "tailwind") {
    out.namespace = token.tailwindNamespace;
  }

  if (token.valueLight !== undefined) {
    out.valueLight = token.valueLight;
    out.valueDark = token.valueDark;
  } else if (token.value !== undefined) {
    out.value = token.value;
  }

  if (token.description) {
    out.description = token.description;
  }

  return out;
}

function tokenKey(token: TokenEntry, format: TokenFormat): string {
  switch (format) {
    case "css":
      return `--s-${token.name}`;
    case "scss":
      return `$s-${token.name}`;
    case "tailwind":
      return token.name;
  }
}
