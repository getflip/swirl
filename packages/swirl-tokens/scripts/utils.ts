export enum TailwindTypes {
  COLOR = "colors",
  SPACING = "spacing",
  BORDER_RADIUS = "borderRadius",
  BORDER_WIDTH = "borderWidth",
  LINE_HEIGHTS = "lineHeight",
  FONT_WEIGHTS = "fontWeight",
  FONT_FAMILIES = "fontFamily",
  LETTER_SPACING = "letterSpacing",
  OTHER = "zIndex",
}

export type mappedTokensType =
  | {
      [key in TailwindTypes]: Object;
    }
  | {};

export const TailwindTokenMap = new Map<string, string>([
  ["color", TailwindTypes.COLOR],
  ["spacing", TailwindTypes.SPACING],
  ["borderRadius", TailwindTypes.BORDER_RADIUS],
  ["borderWidth", TailwindTypes.BORDER_WIDTH],
  ["lineHeights", TailwindTypes.LINE_HEIGHTS],
  ["fontWeights", TailwindTypes.FONT_WEIGHTS],
  ["fontFamilies", TailwindTypes.FONT_FAMILIES],
  ["letterSpacing", TailwindTypes.LETTER_SPACING],
  ["other", TailwindTypes.OTHER],
]);

export const tokenGroups: {
  [group: string]: {
    excludePrefixed?: string[];
    label: string;
    prefixes: string[];
    presenter: string;
  };
} = {
  backgroundColors: {
    label: "Background Colors",
    prefixes: [
      "background-",
      "surface-",
      "on-surface",
      "action-",
      "decorative-",
      "interactive-",
    ],
    presenter: "Color",
  },
  borderColors: {
    excludePrefixed: ["border-width", "border-radius"],
    label: "Border Colors",
    prefixes: ["border-", "focus"],
    presenter: "Color",
  },
  borderRadius: {
    label: "Border Radius",
    prefixes: ["border-radius-"],
    presenter: "BorderRadius",
  },
  borderWidth: {
    label: "Border Width",
    prefixes: ["border-width-"],
    presenter: "Spacing",
  },
  fontFamilies: {
    label: "Font Families",
    prefixes: ["font-family-"],
    presenter: "FontFamily",
  },
  fontSizes: {
    label: "Font Sizes",
    prefixes: ["font-size-"],
    presenter: "FontSize",
  },
  fontWeights: {
    label: "Font Weights",
    prefixes: ["font-weight-"],
    presenter: "FontWeight",
  },
  iconColors: {
    label: "Icon Colors",
    prefixes: ["icon-"],
    presenter: "Color",
  },
  letterSpacings: {
    label: "Letter Spacings",
    prefixes: ["letter-spacing-"],
    presenter: "LetterSpacing",
  },
  lineHeights: {
    label: "Line Heights",
    prefixes: ["line-height-"],
    presenter: "LineHeight",
  },
  spacings: {
    label: "Spacings",
    prefixes: ["space-"],
    presenter: "Spacing",
  },
  textColors: {
    label: "Text Colors",
    prefixes: ["text-"],
    presenter: "Color",
  },
  other: {
    label: "Other",
    prefixes: [],
    presenter: "",
  },
};
