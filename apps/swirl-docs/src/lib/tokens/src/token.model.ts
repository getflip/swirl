export type Token = {
  name: string;
  type: "color" | "size" | TypographyTokenCategory;
  value: string;
  description: string;
};

export const typographyTypes = [
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

export type ColorTokenCategory =
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
