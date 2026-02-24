import type { ExtractedDocs } from "./types";

export function getDocsFromMdx(mdxContent: string): ExtractedDocs | null {
  const description = extractComponentDescription(mdxContent);
  const accessibility = extractAccessibilitySection(mdxContent);
  if (!description && !accessibility) {
    return null;
  }
  return { description: description || "", accessibility: accessibility || "" };
}

function extractComponentDescription(mdxContent: string): string {
  // First paragraph(s) after # Title; stop at "- **", "##", or "<".
  const afterTitle = mdxContent.replace(/^[\s\S]*?^#\s+.+$/m, "");
  const trimmed = afterTitle.trimStart();
  const stop = trimmed.search(/\n\n(\s*-\s*\*\*|##|\s*<)/);
  const block = stop >= 0 ? trimmed.slice(0, stop) : trimmed;
  const paragraph = block.replace(/\n+/g, " ").trim();

  return paragraph;
}

function extractAccessibilitySection(mdxContent: string): string {
  // Match to next ## or end of string (avoid multiline $ so we get full section)
  const sectionMatch = mdxContent.match(
    /##\s+Accessibility\s+([\s\S]*?)(?=\n##\s|$)/
  );

  if (!sectionMatch) {
    return "";
  }

  return normalizeSection(sectionMatch[1]);
}

function normalizeSection(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
