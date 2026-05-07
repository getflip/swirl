import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export type AgentTokenCategory = "colors" | "typography" | "layout";

export interface AgentTokenEntry {
  name: string;
  value?: unknown;
  valueLight?: unknown;
  valueDark?: unknown;
  description?: string;
  tailwindNamespace?: string;
}

export interface AgentTokensIndex {
  schemaVersion: 1;
  colors: AgentTokenEntry[];
  typography: AgentTokenEntry[];
  layout: AgentTokenEntry[];
}

// Mirrors the namespace mapping in
// packages/swirl-tokens/scripts/utils.ts (TailwindTokenMap) and the
// shape of packages/swirl-tokens/dist/tailwind/{light,dark}.json.
// Token types absent from this map (boxShadow, zIndex, dimension,
// textDecoration) have no Tailwind namespace and are only available
// via CSS variables / SCSS.
const TAILWIND_NAMESPACE_BY_TYPE: Record<string, string> = {
  color: "colors",
  fontFamilies: "fontFamily",
  fontSizes: "fontSize",
  fontWeights: "fontWeight",
  lineHeights: "lineHeight",
  letterSpacing: "letterSpacing",
  spacing: "spacing",
  borderRadius: "borderRadius",
  borderWidth: "borderWidth",
};

const CATEGORY_BY_TYPE: Record<string, AgentTokenCategory> = {
  color: "colors",
  fontFamilies: "typography",
  fontSizes: "typography",
  fontWeights: "typography",
  lineHeights: "typography",
  letterSpacing: "typography",
  textDecoration: "typography",
  spacing: "layout",
  borderRadius: "layout",
  borderWidth: "layout",
  boxShadow: "layout",
  zIndex: "layout",
  dimension: "layout",
};

interface RawToken {
  value: unknown;
  type: string;
  comment?: string;
}

export function buildAgentTokens(tokensRoot: string, outDir: string): void {
  const lightPath = join(tokensRoot, "dist", "styles.light.json");
  const darkPath = join(tokensRoot, "dist", "styles.dark.json");

  const light = JSON.parse(readFileSync(lightPath, "utf8")) as Record<
    string,
    RawToken
  >;
  const dark = JSON.parse(readFileSync(darkPath, "utf8")) as Record<
    string,
    RawToken
  >;

  const buckets: Record<AgentTokenCategory, AgentTokenEntry[]> = {
    colors: [],
    typography: [],
    layout: [],
  };

  for (const [name, entry] of Object.entries(light)) {
    const category = CATEGORY_BY_TYPE[entry.type];
    if (!category) {
      continue;
    }

    // `core-*` colors are internal palette primitives; consumers should use
    // the semantic aliases (text-*, surface-*, action-*, etc.) instead.
    if (entry.type === "color" && name.startsWith("core-")) {
      continue;
    }

    const item: AgentTokenEntry = { name };

    if (entry.type === "color") {
      item.valueLight = entry.value;
      item.valueDark = dark[name]?.value ?? entry.value;
    } else {
      item.value = entry.value;
    }

    const tailwindNamespace = TAILWIND_NAMESPACE_BY_TYPE[entry.type];
    if (tailwindNamespace) {
      item.tailwindNamespace = tailwindNamespace;
    }

    if (entry.comment) {
      item.description = entry.comment;
    }

    buckets[category].push(item);
  }

  const agentDir = join(outDir, "agent");
  mkdirSync(agentDir, { recursive: true });

  const index: AgentTokensIndex = {
    schemaVersion: 1,
    ...buckets,
  };

  writeFileSync(
    join(agentDir, "tokens.json"),
    JSON.stringify(index, null, 2),
    "utf8"
  );
}
