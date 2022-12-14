import { resolve } from "path";
import { copyFileSync, readFileSync, writeFileSync } from "fs";

const template = `import 'package:flutter/widgets.dart';

class SwirlIcons {
  SwirlIcons._();

  static const _kFontFam = 'swirl-icons';
  static const String? _kFontPkg = null;

  {{vars}}
}
`;

function getGlyphsFromScss() {
  return Array.from(
    readFileSync(resolve(__dirname, "../dist/swirl-icons.scss"))
      .toString()
      .matchAll(/^\$([a-zA-Z-]+16): "(\\[a-z0-9]+)";$/gm)
  );
}

function convertGlyphName(name: string): string {
  return name
    .replace("swirl-icons-", "")
    .replace("16", "")
    .split(/\.?(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}

function convertGlyphValue(value: string): string {
  return value.replace("\\", "0x");
}

function buildFlutterFile(glyphs: string[][]): string {
  const convertedGlyphs = glyphs.map((glyph) => [
    convertGlyphName(glyph[1]),
    convertGlyphValue(glyph[2]),
  ]);

  const dartVars = convertedGlyphs.map(
    (glyph) =>
      `static const IconData ${glyph[0]} = IconData(${glyph[1]}, fontFamily: _kFontFam, fontPackage: _kFontPkg);`
  );

  return template.replace("{{vars}}", dartVars.join("\n  "));
}

function writeFlutterFile(flutterFile: string) {
  writeFileSync(
    resolve(__dirname, "../dart/lib/swirl_icons.dart"),
    flutterFile
  );
}

function copyFont() {
  copyFileSync(
    resolve(__dirname, "../dist/swirl-icons.ttf"),
    resolve(__dirname, "../dart/lib/fonts/swirl-icons.ttf")
  );
}

const glyphs = getGlyphsFromScss();
const flutterFile = buildFlutterFile(glyphs);

writeFlutterFile(flutterFile);
copyFont();
