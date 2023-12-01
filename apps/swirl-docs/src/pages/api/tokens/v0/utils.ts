import { isProd } from "@swirl/lib/env";
import fs from "fs";
import path from "path";

export const OVERVIEW_HTML = fs.readFileSync(
  path.resolve("./public/overview.html")
);

export const cssLight = loadFile("/css/styles.light.custom-properties.css");
export const cssDark = loadFile("/css/styles.light.custom-properties.css");

// export const flutterLight = loadFile("/flutter/styles.light.dart");
// export const flutterDark = loadFile("/flutter/styles.dark.dart");

export const lessLight = loadFile("/less/styles.light.less");
export const lessDark = loadFile("/less/styles.dark.less");

export const scssLight = loadFile("/scss/styles.light.scss");
export const scssDark = loadFile("/scss/styles.dark.scss");

function loadFile(filePath: string) {
  let nodeModuleRoot = "node_modules/@getflip/swirl-tokens/dist";

  if (!isProd) {
    nodeModuleRoot = "../../node_modules/@getflip/swirl-tokens/dist";
  }

  console.log("nodeModuleRoot", nodeModuleRoot);

  if (fs.existsSync(nodeModuleRoot + filePath)) {
    return fs.readFileSync(nodeModuleRoot + filePath);
  }
}

export type TokenGroupType =
  | "colors"
  | "spacing"
  | "typography"
  | "border"
  | "zindex"
  | "all";

export const FORMATS = ["json", "css", "scss", "less", "flutter"];
export enum TokenFormats {
  JSON = "json",
  CSS = "css",
  SCSS = "scss",
  LESS = "less",
  FLUTTER = "flutter",
}

export const tokenMap = new Map<TokenGroupType, string[]>([
  ["colors", ["colors"]],
  ["spacing", ["spacing"]],
  ["typography", ["fontSize", "fontWeight", "lineHeight", "letterSpacing"]],
  ["border", ["borderWidth", "borderRadius"]],
  ["zindex", ["zIndex"]],
  [
    "all",
    [
      "colors",
      "spacing",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
      "borderWidth",
      "borderRadius",
      "zIndex",
    ],
  ],
]);
