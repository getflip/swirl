import { resolve } from "path";
import { copyFileSync, readFileSync, readdirSync, writeFileSync } from "fs";

const template = `import 'package:flutter/widgets.dart';

class SwirlIcons {
  SwirlIcons._();

  static const _kFontFam = 'swirl-icons';
  static const String? _kFontPkg = null;

  {{vars}}
}
`;

const templateLegacyIcons = `import 'package:flutter/widgets.dart';

class FlipLegacyIcons {
  FlipLegacyIcons._();

  static const _kFontFam = 'flip-legacy-icons';
  static const String? _kFontPkg = null;

  {{vars}}
}
`;

function getGlyphsFromScss(path: string, legacy: boolean) {
  const regEx = !legacy
    ? /^\$([a-zA-Z-]+16): "(\\[a-z0-9]+)";$/gm
    : /^\$([a-zA-Z-_]+): "(\\[a-z0-9]+)";$/gm;

  return Array.from(
    readFileSync(resolve(__dirname, path)).toString().matchAll(regEx)
  );
}

function convertGlyphName(name: string, legacy: boolean): string {
  return legacy
    ? name.replace("flip-legacy-icons-", "").toLowerCase()
    : name
        .replace("swirl-icons-", "")
        .replace("16", "")
        .split(/\.?(?=[A-Z])/)
        .join("_")
        .toLowerCase();
}

function convertGlyphValue(value: string): string {
  return value.replace("\\", "0x");
}

function buildFlutterFile(
  glyphs: string[][],
  template: string,
  legacy: boolean
): string {
  const convertedGlyphs = glyphs.map((glyph) => [
    convertGlyphName(glyph[1], legacy),
    convertGlyphValue(glyph[2]),
  ]);

  const dartVars = convertedGlyphs.map(
    (glyph) =>
      `static const IconData ${glyph[0]} = IconData(${glyph[1]}, fontFamily: _kFontFam, fontPackage: _kFontPkg);`
  );

  return template.replace("{{vars}}", dartVars.join("\n  "));
}

function writeFlutterFile(flutterFile: string, path: string) {
  writeFileSync(resolve(__dirname, path), flutterFile);
}

function copyFonts() {
  copyFileSync(
    resolve(__dirname, "../dist/swirl-icons.ttf"),
    resolve(__dirname, "../dart/lib/fonts/swirl-icons.ttf")
  );

  copyFileSync(
    resolve(__dirname, "../dist/legacy-icons/flip-legacy-icons.ttf"),
    resolve(__dirname, "../dart/lib/fonts/flip-legacy-icons.ttf")
  );
}

function buildSwirlIcons() {
  const glyphs = getGlyphsFromScss("../dist/swirl-icons.scss", false);
  const flutterFile = buildFlutterFile(glyphs, template, false);

  writeFlutterFile(flutterFile, "../dart/lib/swirl_icons.dart");
}

function buildFlipLegacyIcons() {
  const glyphs = getGlyphsFromScss(
    "../dist/legacy-icons/flip-legacy-icons.scss",
    true
  );

  const flutterFile = buildFlutterFile(glyphs, templateLegacyIcons, true);

  writeFlutterFile(flutterFile, "../dart/lib/flip_legacy_icons.dart");
}

buildSwirlIcons();
buildFlipLegacyIcons();
copyFonts();
