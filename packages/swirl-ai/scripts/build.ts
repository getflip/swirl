import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { augmentCustomElementsManifest } from "../lib/augment-manifest";
import type { CustomElementsManifest } from "../lib/types";

const COMPONENTS_ROOT = join(__dirname, "..", "..", "swirl-components");
const MANIFEST_SOURCE = join(COMPONENTS_ROOT, "custom-elements.manifest.json");
const COMPONENTS_TYPES = join(COMPONENTS_ROOT, "dist", "types");
const DIST_DIR = join(__dirname, "..", "dist");
const DIST_TYPES = join(DIST_DIR, "types");

generateCustomElementsManifest();
copyComponentTypes();

function generateCustomElementsManifest() {
  const manifestString = readFileSync(MANIFEST_SOURCE, "utf8");
  const manifest = JSON.parse(manifestString) as CustomElementsManifest;
  const augmented = augmentCustomElementsManifest(manifest, COMPONENTS_ROOT);

  mkdirSync(DIST_DIR, { recursive: true });

  writeFileSync(
    join(DIST_DIR, "custom-elements.manifest.json"),
    JSON.stringify(augmented, null, 2)
  );
}

function copyComponentTypes() {
  mkdirSync(DIST_DIR, { recursive: true });
  cpSync(COMPONENTS_TYPES, DIST_TYPES, { recursive: true });
}
