import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AgentComponentsIndex,
  ComponentCategory,
  ComponentIndexEntry,
} from "../types";

export class ArtifactLibrary {
  private readonly catalog: ComponentIndexEntry[];
  private readonly tagIndex: Map<string, ComponentIndexEntry>;
  private readonly agentDir: string;

  constructor(agentDir: string) {
    this.agentDir = agentDir;

    const catalogPath = join(agentDir, "components-index.json");
    const raw = readFileSync(catalogPath, "utf-8");
    const json: AgentComponentsIndex = JSON.parse(raw);

    this.catalog = json.components;

    this.tagIndex = new Map();
    for (const entry of this.catalog) {
      this.tagIndex.set(entry.tag, entry);
    }
  }

  getByCategory(category: ComponentCategory): ComponentIndexEntry[] {
    return this.catalog.filter((c) => categorize(c.tag) === category);
  }

  getByTag(tag: string): ComponentIndexEntry | undefined {
    return this.tagIndex.get(tag);
  }

  getComponentMarkdown(tag: string): string | undefined {
    const mdPath = join(this.agentDir, "components", `${tag}.md`);

    try {
      return readFileSync(mdPath, "utf-8");
    } catch {
      return undefined;
    }
  }

  get totalCount(): number {
    return this.catalog.length;
  }
}

/**
 * Resolve the agent artifacts directory relative to the MCP server entry point.
 * At runtime the entry point is dist/mcp/index.mjs, so the agent dir is at
 * dist/agent/ (i.e. ../agent relative to the mcp dir).
 */
export function resolveAgentDir(): string {
  const thisFile = fileURLToPath(import.meta.url);
  const mcpDir = dirname(thisFile);

  return join(mcpDir, "..", "agent");
}

function categorize(tag: string): ComponentCategory {
  if (tag.startsWith("swirl-icon-")) {
    return "icon";
  }
  if (tag.startsWith("swirl-symbol-")) {
    return "symbol";
  }
  if (tag.startsWith("swirl-emoji-")) {
    return "emoji";
  }
  return "core";
}
