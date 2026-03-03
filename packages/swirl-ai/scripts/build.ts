import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { buildAgentComponentDocs } from "../lib/agent-docs";
import { buildAgentComponentsIndex } from "../lib/agent-index";
import { augmentCustomElementsManifest } from "../lib/augment-manifest";
import type { CustomElementsManifest } from "../lib/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_ROOT = join(__dirname, "..", "..", "swirl-components");
const MANIFEST_SOURCE = join(COMPONENTS_ROOT, "custom-elements.manifest.json");
const COMPONENTS_TYPES = join(COMPONENTS_ROOT, "dist", "types");
const DIST_DIR = join(__dirname, "..", "dist");
const DIST_TYPES = join(DIST_DIR, "types");
const MANIFEST_OUT = join(DIST_DIR, "custom-elements.manifest.json");

generateCustomElementsManifest();
copyComponentTypes();
buildAgentComponentsIndex(MANIFEST_OUT, DIST_DIR, COMPONENTS_ROOT);
buildAgentComponentDocs(MANIFEST_OUT, DIST_DIR, COMPONENTS_ROOT);
copyGettingStarted();

function generateCustomElementsManifest() {
  const manifestString = readFileSync(MANIFEST_SOURCE, "utf8");
  const manifest = JSON.parse(manifestString) as CustomElementsManifest;
  const augmented = augmentCustomElementsManifest(manifest, COMPONENTS_ROOT);

  mkdirSync(DIST_DIR, { recursive: true });
  writeFileSync(MANIFEST_OUT, JSON.stringify(augmented, null, 2));
}

function copyComponentTypes() {
  mkdirSync(DIST_DIR, { recursive: true });
  cpSync(COMPONENTS_TYPES, DIST_TYPES, { recursive: true });
}

function copyGettingStarted() {
  const mdxPath = join(
    COMPONENTS_ROOT,
    "src",
    "docs",
    "01-usage",
    "01-get-started.stories.mdx"
  );
  const raw = readFileSync(mdxPath, "utf8");
  // Strip MDX imports and <Meta> tags
  const md = raw
    .replace(/^import\s.*;\s*\n/gm, "")
    .replace(/<Meta[^>]*\/>\s*\n/g, "")
    .trim();

  const agentDir = join(DIST_DIR, "agent");
  mkdirSync(agentDir, { recursive: true });
  writeFileSync(join(agentDir, "get-started.md"), md, "utf8");
}
