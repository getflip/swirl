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
  const { summary, whenToUse, accessibilityInfo } = parseDescription(
    decl.description
  );
  const { requiredProps, optionalProps } = getProps(decl);
  const events =
    (
      decl.events as { name: string; type?: { text: string } }[] | undefined
    )?.map((e) => ({ name: e.name, type: e.type?.text })) ?? [];
  const slots =
    (decl.slots as { name: string; description?: string }[] | undefined)?.map(
      (s) => ({
        name: s.name,
        description: s.description,
      })
    ) ?? [];
  const methods =
    (
      decl.members as
        | { kind: string; name: string; description?: string }[]
        | undefined
    )
      ?.filter((m) => m.kind === "method")
      ?.map((m) => ({ name: m.name, description: m.description })) ?? [];
  const mdxPath = join(componentsRoot, "src", "components", tag, `${tag}.mdx`);
  const relatedSection = readRelatedComponentsFromMdx(mdxPath);
  const relatedComponents = parseRelatedComponentTags(relatedSection);

  return {
    tag,
    summary: summary || tag,
    whenToUse: whenToUse || undefined,
    requiredProps,
    optionalProps,
    events,
    slots,
    methods,
    accessibilityInfo: accessibilityInfo || undefined,
    compositionRules: undefined,
    relatedComponents,
    status: "stable",
  };
}

function parseDescription(desc: string | undefined): {
  summary: string;
  whenToUse?: string;
  accessibilityInfo?: string;
} {
  if (!desc || !desc.trim()) {
    return { summary: "" };
  }

  const accIndex = desc.indexOf("\n\nAccessibility\n");
  const main = accIndex >= 0 ? desc.slice(0, accIndex).trim() : desc.trim();
  const a11y =
    accIndex >= 0
      ? desc.slice(accIndex + "\n\nAccessibility\n".length).trim()
      : undefined;
  const summary = main.replace(/\s+/g, " ").slice(0, 500);

  return {
    summary,
    accessibilityInfo: a11y ? stripMarkdown(a11y).slice(0, 2000) : undefined,
  };
}

function stripMarkdown(s: string): string {
  return s
    .replace(/<kbd>([^<]*)<\/kbd>/gi, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\|/g, " ")
    .replace(/\n+/g, "\n")
    .trim();
}

function getProps(decl: Declaration): {
  requiredProps: string[];
  optionalProps: string[];
} {
  const requiredSet = new Set<string>();
  const optionalSet = new Set<string>();
  const consider = (name: string, typeText: string | undefined) => {
    const isOptional =
      !typeText ||
      typeText.includes("| undefined") ||
      typeText.endsWith(" | undefined");

    if (isOptional) {
      optionalSet.add(name);
    } else {
      requiredSet.add(name);
    }
  };

  for (const attr of decl.attributes ?? []) {
    const name =
      (attr as { fieldName?: string; name: string }).fieldName ?? attr.name;
    const typeText = (attr as { type?: { text: string } }).type?.text;

    consider(name, typeText);
  }

  for (const member of decl.members ?? []) {
    const m = member as { kind: string; name: string; type?: { text: string } };

    if (m.kind !== "field") {
      continue;
    }

    consider(m.name, m.type?.text);
  }

  // Required wins if ever both (e.g. attribute vs field)
  for (const r of requiredSet) {
    optionalSet.delete(r);
  }

  return {
    requiredProps: [...requiredSet],
    optionalProps: [...optionalSet],
  };
}

/**
 * Extract component tag names from MDX "Related components" list links only.
 */
function parseRelatedComponentTags(sectionText: string): string[] {
  if (!sectionText || sectionText.includes("No related components.")) {
    return [];
  }
  const tags = new Set<string>();
  // Match [swirl-tag-name](...) so we only get explicitly listed components
  const matches = sectionText.matchAll(/\[(swirl-[a-z0-9-]+)\]\([^)]+\)/g);
  for (const m of matches) {
    tags.add(m[1]);
  }
  return [...tags];
}
