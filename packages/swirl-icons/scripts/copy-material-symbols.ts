import { existsSync, readFile, writeFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";

const icons = require("./material-symbols.json");

const iconSizes = [16, 24, 28];

function toPascalCase(str: string): string {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function toPascalCaseIconFileName(icon: string, size: number): string {
  const isFilled = icon.includes("-fill");
  const iconNormalized = icon.replace("-fill", "");
  const iconStyleSuffix = isFilled ? "Filled" : "";

  return `${toPascalCase(iconNormalized)}${iconStyleSuffix}${size}.svg`;
}

async function copyIcons() {
  const sourceDir = "../../../node_modules/@material-symbols/svg-400/rounded";
  const destDir = "../icons";

  const readFileAsync = promisify(readFile);
  const writeFileAsync = promisify(writeFile);

  for (const icon of icons) {
    try {
      const sourceFile = resolve(__dirname, sourceDir, `${icon}.svg`);
      const alreadyImportedFile = resolve(
        __dirname,
        destDir,
        toPascalCaseIconFileName(icon, iconSizes[0])
      );

      if (existsSync(alreadyImportedFile)) {
        console.info(`Icon already imported: ${icon}`);
        continue;
      }

      if (!existsSync(sourceFile)) {
        console.error(`Icon not found: ${icon}`);
        continue;
      }

      const svgContent = await readFileAsync(sourceFile, "utf8");

      for (const size of iconSizes) {
        const destFileName = toPascalCaseIconFileName(icon, size);
        const destFile = resolve(__dirname, destDir, destFileName);

        let resizedSvg = svgContent
          .replace('width="48"', `width="${size}"`)
          .replace('height="48"', `height="${size}"`);

        await writeFileAsync(destFile, resizedSvg);

        console.log(`Created: ${destFileName}`);
      }
    } catch (error) {
      console.error(`Error processing icon ${icon}:`, error);
    }
  }

  console.log("Icons copying completed!");
}

copyIcons().catch(console.error);
