import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

copyCustomElementsManifest();

function copyCustomElementsManifest() {
  const customElementsManifest = readFileSync(
    join(
      __dirname,
      "..",
      "..",
      "swirl-components",
      "custom-elements.manifest.json"
    ),
    "utf8"
  );

  const outDir = join(__dirname, "..", "dist");

  mkdirSync(outDir, { recursive: true });

  writeFileSync(
    join(outDir, "custom-elements.manifest.json"),
    customElementsManifest
  );
}
