import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { augmentCustomElementsManifest } from "../lib/augment-manifest";
import type { CustomElementsManifest } from "../lib/types";

const COMPONENTS_ROOT = join(__dirname, "..", "..", "swirl-components");
const MANIFEST_SOURCE = join(COMPONENTS_ROOT, "custom-elements.manifest.json");
const DIST_DIR = join(__dirname, "..", "dist");

generateCustomElementsManifest();

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
