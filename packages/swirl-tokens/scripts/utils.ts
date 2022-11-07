import fs from "fs";

export enum TailwindTypes {
  COLOR = "colors",
  SPACING = "spacing",
  BORDER_RADIUS = "borderRadius",
  BORDER_WIDTH = "borderWidth",
  LINE_HEIGHTS = "lineHeight",
  FONT_WEIGHTS = "fontWeight",
  FONT_FAMILIES = "fontFamily",
  FONT_SIZES = "fontSize",
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
  ["fontSizes", TailwindTypes.FONT_SIZES],
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
    excludePrefixed: [
      "border-width",
      "border-radius",
      "decorative-chilli-text",
      "decorative-pumpkin-text",
      "decorative-banana-text",
      "decorative-radish-text",
      "decorative-grape-text",
      "decorative-kiwi-text",
      "decorative-blueberry-text",
    ],
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
    prefixes: [
      "text-",
      "decorative-chilli-text",
      "decorative-pumpkin-text",
      "decorative-banana-text",
      "decorative-radish-text",
      "decorative-grape-text",
      "decorative-kiwi-text",
      "decorative-blueberry-text",
    ],
    presenter: "Color",
  },
  other: {
    label: "Other",
    prefixes: [],
    presenter: "",
  },
};

/**
 * Bundle light and dark themes into a single theme
 */
export function createSwirlTailwindTheme() {
  let oneTheme: any = {};
  const lightTheme = require("../dist/tailwind/light.json");

  for (const key of Object.keys(lightTheme)) {
    if (!oneTheme[key]) {
      oneTheme[key] = {};
    }

    oneTheme[key] = extendTokenGroup(key);
  }

  fs.writeFile(
    "./dist/tailwind/swirl-tailwind.json",
    JSON.stringify(oneTheme, null, 2),
    () => {
      console.log("one theme created");
    }
  );
}

export function extendTokenGroup(tokenGroup: string) {
  const lightTheme = require("../dist/tailwind/light.json");
  const darkTheme = require("../dist/tailwind/dark.json");

  const tokenGroupKeys = Object.keys(lightTheme[tokenGroup]);

  let extendedTokenGroup: any = {};

  for (const tokenGroupKey of tokenGroupKeys) {
    extendedTokenGroup[tokenGroupKey] = {
      ...lightTheme[tokenGroup][tokenGroupKey],
      dark: darkTheme[tokenGroup][tokenGroupKey].dark,
    };
  }

  return extendedTokenGroup;
}
