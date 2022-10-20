import { SWIRL_TOKENS_DIST_PATH } from "@swirl/lib/navigation";
import fs from "fs";
import path from "path";

export const OVERVIEW_HTML = fs.readFileSync(
  path.resolve("./public/overview.html")
);

export const cssLight = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/css/styles.light.custom-properties.css"
);
export const cssDark = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/css/styles.light.custom-properties.css"
);

export const flutterLight = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/flutter/styles.light.dart"
);
export const flutterDark = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/flutter/styles.dark.dart"
);

export const lessLight = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/less/styles.light.less"
);
export const lessDark = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/less/styles.dark.less"
);

export const scssLight = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/scss/styles.light.scss"
);
export const scssDark = fs.readFileSync(
  SWIRL_TOKENS_DIST_PATH + "/scss/styles.dark.scss"
);

export type TokenGroupType =
  | "colors"
  | "spacing"
  | "typography"
  | "border"
  | "zindex"
  | "all";

export const Formats = ["json", "css", "scss", "less", "flutter"];
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
