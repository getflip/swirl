import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type {
  Attribute,
  CustomElementsManifest,
  Declaration,
  ExtractedDocs,
  Member,
} from "../lib/types";
import { getDocsFromMdx } from "./parse-mdx";
import { getRequiredPropNamesFromTsx } from "./parse-tsx";

export function augmentCustomElementsManifest(
  manifest: CustomElementsManifest,
  componentsRoot: string
): CustomElementsManifest {
  const out = { ...manifest, modules: [...manifest.modules] };

  for (let i = 0; i < out.modules.length; i++) {
    const mod = out.modules[i];

    if (mod.kind !== "javascript-module" || !mod.path?.endsWith(".tsx")) {
      continue;
    }

    if (!mod.declarations?.length) {
      continue;
    }

    const tsxPath = join(componentsRoot, mod.path);
    const mdxPath = tsxPath.replace(/\.tsx$/, ".mdx");

    let tsxContent: string | null = null;
    let mdxContent: string | null = null;

    if (existsSync(tsxPath)) {
      tsxContent = readFileSync(tsxPath, "utf8");
    }

    if (existsSync(mdxPath)) {
      mdxContent = readFileSync(mdxPath, "utf8");
    }

    const requiredPropNames = tsxContent
      ? getRequiredPropNamesFromTsx(tsxContent)
      : new Set<string>();

    const docs = mdxContent ? getDocsFromMdx(mdxContent) : null;

    for (const decl of mod.declarations) {
      if (decl.kind !== "class" || !decl.customElement || !decl.tagName) {
        continue;
      }

      applyDescription(decl, docs);
      applyRequirednessToDeclaration(decl, requiredPropNames);
    }
  }

  return out;
}

function applyDescription(decl: Declaration, docs: ExtractedDocs | null): void {
  if (!docs) {
    return;
  }

  const parts: string[] = [];

  if (docs.description) {
    parts.push(docs.description);
  }

  if (docs.accessibility) {
    parts.push("Accessibility\n\n" + docs.accessibility);
  }

  if (parts.length) {
    decl.description = parts.join("\n\n");
  }
}

function applyRequirednessToDeclaration(
  decl: Declaration,
  requiredPropNames: Set<string>
): void {
  if (decl.attributes) {
    for (const attr of decl.attributes) {
      const propName = attr.fieldName ?? kebabToCamel(attr.name);
      ensureTypeOptionalOrRequired(attr, propName, requiredPropNames);
    }
  }

  if (decl.members) {
    for (const member of decl.members) {
      if (member.kind !== "field") continue;
      ensureTypeOptionalOrRequired(member, member.name, requiredPropNames);
    }
  }
}

function kebabToCamel(kebab: string): string {
  return kebab.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function ensureTypeOptionalOrRequired(
  item: Attribute | Member,
  propName: string,
  requiredPropNames: Set<string>
): void {
  const hasDefault = "default" in item && item.default !== undefined;
  const isRequired = !hasDefault && requiredPropNames.has(propName);
  const typeObj = item.type;

  if (!typeObj || typeof typeObj.text !== "string") {
    return;
  }

  const base = typeObj.text.replace(/\s*\|\s*undefined\s*$/, "").trim();

  if (isRequired) {
    typeObj.text = base;
  } else {
    typeObj.text = base + " | undefined";
  }
}
