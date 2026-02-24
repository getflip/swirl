import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { CustomElementsManifest, Declaration } from "./types";

/**
 * Build dist/agent/components/<tag>.md for each custom element from the
 * manifest.
 */

export function buildAgentComponentDocs(
  manifestPath: string,
  outDir: string
): void {
  const raw = readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(raw) as CustomElementsManifest;
  const componentsDir = join(outDir, "agent", "components");

  mkdirSync(componentsDir, { recursive: true });

  for (const mod of manifest.modules ?? []) {
    if (mod.kind !== "javascript-module" || !mod.declarations?.length) {
      continue;
    }

    for (const decl of mod.declarations as Declaration[]) {
      if (decl.kind !== "class" || !decl.customElement || !decl.tagName) {
        continue;
      }

      const tag = decl.tagName;
      const md = declarationToMarkdown(decl);

      writeFileSync(join(componentsDir, `${tag}.md`), md, "utf8");
    }
  }
}

function declarationToMarkdown(decl: Declaration): string {
  const tag = decl.tagName!;
  const desc = decl.description ?? "";
  const { purpose, accessibility } = splitDescription(desc);
  const requiredProps = getRequiredProps(decl);
  const optionalProps = getOptionalProps(decl);
  const slots =
    (decl.slots as { name: string; description?: string }[] | undefined) ?? [];
  const events =
    (decl.events as { name: string; type?: { text: string } }[] | undefined) ??
    [];
  const methods =
    (
      decl.members as
        | { kind: string; name: string; description?: string }[]
        | undefined
    )?.filter((m) => m.kind === "method") ?? [];
  const related = extractRelatedFromDescription(desc);

  const lines: string[] = [
    `# \`<${tag}>\``,
    "",
    "## Purpose",
    "",
    purpose || `Custom element: ${tag}.`,
    "",
    "## Required props",
    "",
    requiredProps.length
      ? requiredProps
          .map((p) => `- \`${p.name}\` (${p.type}) – ${p.description ?? ""}`)
          .join("\n")
      : "_None._",
    "",
    "## Optional props",
    "",
    optionalProps.length
      ? optionalProps
          .map((p) => `- \`${p.name}\` (${p.type}) – ${p.description ?? ""}`)
          .join("\n")
      : "_None._",
    "",
    "## Slots",
    "",
    slots.length
      ? slots
          .map((s) => `- **\`${s.name}\`** – ${s.description ?? ""}`)
          .join("\n")
      : "_None._",
    "",
    "## Events",
    "",
    events.length
      ? events.map((e) => `- \`${e.name}\` – ${e.type?.text ?? ""}`).join("\n")
      : "_None._",
    "",
    "## Methods",
    "",
    methods.length
      ? methods
          .map((m) => `- \`${m.name}()\` – ${m.description ?? ""}`)
          .join("\n")
      : "_None._",
    "",
    "## Composition",
    "",
    related.length
      ? `Use with: ${related.map((t) => `\`<${t}>\``).join(", ")}.`
      : "_See description for usage context._",
    "",
    "## Accessibility",
    "",
    accessibility || "_See full docs for accessibility details._",
    "",
    "## Minimal example",
    "",
    "```html",
    minimalExample(tag, requiredProps),
    "```",
    "",
    "## Common mistakes",
    "",
    "- Ensure required props are set.",
    "- Use only allowed slot names and child components where documented.",
    "",
  ];

  return lines.join("\n");
}

function splitDescription(desc: string): {
  purpose: string;
  accessibility: string;
} {
  const accIndex = desc.indexOf("\n\nAccessibility\n");
  const purpose = accIndex >= 0 ? desc.slice(0, accIndex).trim() : desc.trim();
  const accessibility =
    accIndex >= 0
      ? desc.slice(accIndex + "\n\nAccessibility\n".length).trim()
      : "";

  return { purpose, accessibility };
}

function getRequiredProps(
  decl: Declaration
): { name: string; type: string; description?: string }[] {
  const byName = new Map<
    string,
    { name: string; type: string; description?: string }
  >();
  const add = (name: string, typeText: string) => {
    if (!byName.has(name))
      byName.set(name, { name, type: typeText, description: undefined });
  };

  for (const attr of decl.attributes ?? []) {
    const a = attr as {
      fieldName?: string;
      name: string;
      type?: { text: string };
      default?: string;
    };
    const name = a.fieldName ?? a.name;
    const typeText = a.type?.text ?? "unknown";

    if (typeText.includes("| undefined") || a.default !== undefined) {
      continue;
    }

    add(name, typeText);
  }

  for (const m of decl.members ?? []) {
    const member = m as {
      kind: string;
      name: string;
      type?: { text: string };
      default?: string;
    };

    if (member.kind !== "field") {
      continue;
    }

    const typeText = member.type?.text ?? "unknown";

    if (typeText.includes("| undefined") || member.default !== undefined) {
      continue;
    }

    add(member.name, typeText);
  }

  return [...byName.values()];
}

function getOptionalProps(
  decl: Declaration
): { name: string; type: string; description?: string }[] {
  const byName = new Map<
    string,
    { name: string; type: string; description?: string }
  >();
  const add = (name: string, typeText: string) => {
    if (!byName.has(name))
      byName.set(name, { name, type: typeText, description: undefined });
  };

  for (const attr of decl.attributes ?? []) {
    const a = attr as {
      fieldName?: string;
      name: string;
      type?: { text: string };
      default?: string;
    };
    const name = a.fieldName ?? a.name;
    const typeText = a.type?.text ?? "unknown";

    if (!typeText.includes("| undefined") && a.default === undefined) {
      continue;
    }

    add(name, typeText);
  }

  for (const m of decl.members ?? []) {
    const member = m as {
      kind: string;
      name: string;
      type?: { text: string };
      default?: string;
    };

    if (member.kind !== "field") {
      continue;
    }

    const typeText = member.type?.text ?? "unknown";

    if (!typeText.includes("| undefined") && member.default === undefined) {
      continue;
    }

    add(member.name, typeText);
  }

  return [...byName.values()];
}

function minimalExample(
  tag: string,
  required: { name: string; type: string }[]
): string {
  const attrs = required
    .filter((p) => p.type === "string")
    .map((p) => `${p.name}="..."`)
    .join(" ");

  if (attrs) {
    return `<${tag} ${attrs}></${tag}>`;
  }

  return `<${tag}></${tag}>`;
}

function extractRelatedFromDescription(desc: string | undefined): string[] {
  if (!desc) {
    return [];
  }

  const matches = desc.matchAll(/\[(Swirl[A-Za-z0-9]+)\]/g);
  const names = new Set<string>();

  for (const m of matches) {
    names.add(m[1]);
  }

  return [...names].map(camelToKebab).filter((t) => t.startsWith("swirl-"));
}

function camelToKebab(camel: string): string {
  return camel
    .replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}-${b.toLowerCase()}`)
    .toLowerCase();
}
