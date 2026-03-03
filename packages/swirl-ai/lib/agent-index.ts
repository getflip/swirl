import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { readRelatedComponentsFromMdx } from "./agent-docs";
import type {
  AgentComponentsIndex,
  ComponentIndexEntry,
  CustomElementsManifest,
  Declaration,
} from "./types";

/**
 * Build dist/agent/components-index.json from the augmented custom elements
 * manifest.
 */
export function buildAgentComponentsIndex(
  manifestPath: string,
  outPath: string,
  componentsRoot: string
): void {
  const raw = readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(raw) as CustomElementsManifest;
  const components: ComponentIndexEntry[] = [];

  for (const mod of manifest.modules ?? []) {
    if (mod.kind !== "javascript-module" || !mod.declarations?.length) {
      continue;
    }

    for (const decl of mod.declarations as Declaration[]) {
      if (decl.kind !== "class" || !decl.customElement || !decl.tagName) {
        continue;
      }

      components.push(declToIndexEntry(decl, componentsRoot));
    }
  }

  const index: AgentComponentsIndex = {
    schemaVersion: 1,
    components,
  };

  mkdirSync(join(outPath, "agent"), { recursive: true });
  writeFileSync(
    join(outPath, "agent", "components-index.json"),
    JSON.stringify(index, null, 2),
    "utf8"
  );
}

function declToIndexEntry(
  decl: Declaration,
  componentsRoot: string
): ComponentIndexEntry {
  const tag = decl.tagName!;
  const summary = parseSummary(decl.description);
  const mdxPath = join(componentsRoot, "src", "components", tag, `${tag}.mdx`);
  const relatedSection = readRelatedComponentsFromMdx(mdxPath);
  const relatedComponents = parseRelatedComponentTags(relatedSection);

  return {
    tag,
    summary: summary || tag,
    ...(relatedComponents.length > 0 && { relatedComponents }),
  };
}

function parseSummary(desc: string | undefined): string {
  if (!desc || !desc.trim()) {
    return "";
  }

  const accIndex = desc.indexOf("\n\nAccessibility\n");
  const main = accIndex >= 0 ? desc.slice(0, accIndex).trim() : desc.trim();

  return main.replace(/\s+/g, " ").slice(0, 500);
}

/**
 * Extract component tag names from MDX "Related components" list links only.
 */
function parseRelatedComponentTags(sectionText: string): string[] {
  if (!sectionText || sectionText.includes("No related components.")) {
    return [];
  }
  const tags = new Set<string>();
  const matches = sectionText.matchAll(/\[(swirl-[a-z0-9-]+)\]\([^)]+\)/g);
  for (const m of matches) {
    tags.add(m[1]);
  }
  return [...tags];
}
