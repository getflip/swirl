export type Token = {
  name: string;
  type:
    | ColorTokenCategory
    | SizeTokenCategory
    | TypographyTokenCategory
    | BorderTokenCategory
    | SpacingTokenCategory
    | ZIndexTokenCategory;
  value: string;
  description: string;
};

export type SizeTokenCategory = "size";

export const typographyTypes = [
  "fontWeights",
  "lineHeights",
  "letterSpacing",
  "fontFamily",
  "fontSizes",
];

export const TypographyTokenCategories = [
  "fontWeights",
  "lineHeights",
  "letterSpacing",
  "fontFamily",
  "fontSizes",
];

export type TypographyTokenCategory =
  | "fontWeights"
  | "lineHeights"
  | "letterSpacing"
  | "fontFamily"
  | "fontSizes";

export type TypographyTokens = {
  fontWeights: Token[];
  lineHeights: Token[];
  letterSpacing: Token[];
  fontFamily: Token[];
  fontSizes: Token[];
};

export const BorderTokenCategories = ["borderRadius", "borderWidth"];

export type BorderTokenCategory = "borderRadius" | "borderWidth";

export type BorderTokens = {
  borderRadius: Token[];
  borderWidth: Token[];
};

export const SpacingTokenCategories = ["spacing"];
export type SpacingTokenCategory = "spacing";
export type SpacingTokens = {
  spacing: Token[];
};

export const ZIndexTokenCategories = ["zIndex"];
export type ZIndexTokenCategory = "zIndex";
export type ZIndexTokens = {
  zIndex: Token[];
};

export type ColorTokenCategory = "color";

export type ColorTokenGroups =
  | "background"
  | "surface"
  | "border"
  | "action"
  | "interactive"
  | "text"
  | "icon"
  | "decoratives"
  | "core";

export type ColorTokens = {
  background?: Token[];
  surface?: Token[];
  border?: Token[];
  action?: Token[];
  interactive?: Token[];
  text?: Token[];
  icon?: Token[];
  decoratives?: Token[];
  core?: Token[];
};
