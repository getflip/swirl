export type SwirlTokenCategory =
  | ColorTokenCategory
  | SizeTokenCategory
  | TypographyTokenCategory
  | BorderTokenCategory
  | SpacingTokenCategory
  | ZIndexTokenCategory;

export type Token = {
  name: string;
  type: SwirlTokenCategory;
  value: string;
  description: string;
  valueAsString?: string;
  unitAsString?: string;
};

export type TokensWithoutColors = Exclude<SwirlTokenCategory, "color">;
export type SwirlTokensWithoutColor = {
  [K in TokensWithoutColors]: Token[];
};
export type SizeTokenCategory = "size";

export type TypographyTokenCategory =
  | "fontWeights"
  | "lineHeights"
  | "letterSpacing"
  | "fontFamily"
  | "fontSizes";
export const TypographyTokenCategories: Array<SwirlTokenCategory> = [
  "fontWeights",
  "lineHeights",
  "letterSpacing",
  "fontFamily",
  "fontSizes",
];

export type TypographyTokens = {
  fontWeights: Token[];
  lineHeights: Token[];
  letterSpacing: Token[];
  fontFamily: Token[];
  fontSizes: Token[];
};

export type BorderTokenCategory = "borderRadius" | "borderWidth";
export const BorderTokenCategories: Array<SwirlTokenCategory> = [
  "borderRadius",
  "borderWidth",
];
export type BorderTokens = {
  borderRadius: Token[];
  borderWidth: Token[];
};

export type SpacingTokenCategory = "spacing";
export const SpacingTokenCategories: Array<SwirlTokenCategory> = ["spacing"];
export type SpacingTokens = {
  spacing: Token[];
};

export type ZIndexTokenCategory = "zIndex";
export const ZIndexTokenCategories: Array<SwirlTokenCategory> = ["zIndex"];
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
  | "icon";

export type ColorTokens = {
  background?: Token[];
  surface?: Token[];
  border?: Token[];
  action?: Token[];
  interactive?: Token[];
  text?: Token[];
  icon?: Token[];
};
