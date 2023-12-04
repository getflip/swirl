import tokensLight from "@getflip/swirl-tokens/dist/styles.light.json";
import {
  ColorTokenGroups,
  SwirlColorToken,
  SwirlToken,
  SwirlTokenKey,
  SwirlTokens,
  Token,
} from "./token.model";
import { generateTokenValueWithUnit } from "./utils";

type ColorTokenGroup = Record<ColorTokenGroups, Token[]>;

export function getColorTokens(): ColorTokenGroup {
  const colorTokens: ColorTokenGroup = {
    background: [],
    surface: [],
    border: [],
    text: [],
    icon: [],
    action: [],
    interactive: [],
    focus: [],
    skeleton: [],
    decorative: [],
  };

  getFilteredColorTokens().forEach((token) => {
    const transformedToken = transformTokenToColorToken(token);
    if (transformedToken) {
      const colorTokenGroup = getColorCategory(token as SwirlColorToken);
      colorTokens[colorTokenGroup]?.push(transformedToken);
    }
  });

  return colorTokens;
}

const colorCategories = new Map<string, ColorTokenGroups>([
  ["background", "background"],
  ["surface", "surface"],
  ["border", "border"],
  ["action", "action"],
  ["interactive", "interactive"],
  ["text", "text"],
  ["icon", "icon"],
  ["focus", "focus"],
  ["skeleton", "skeleton"],
  ["decorative", "decorative"],
]);

function getColorCategory(token: SwirlColorToken): ColorTokenGroups {
  return colorCategories.get(token.name.split("-")[0]) || "background";
}

function transformTokenToColorToken(token: SwirlToken): Token | null {
  const tokenValueWithUnit = generateTokenValueWithUnit(token);
  const colorToken = isColorToken(token) ? token : null;

  if (!colorToken) {
    return null;
  }

  return {
    name: token.name,
    type: "color",
    value: String(token.value),
    description: String(token.comment || ""),
    valueAsString: tokenValueWithUnit?.value,
    unitAsString: tokenValueWithUnit?.unit,
  };
}

function isColorToken(token: SwirlToken): token is SwirlColorToken {
  return token.type === "color" && !token.name.includes("core");
}

function getFilteredColorTokens(): SwirlToken[] {
  const lightTokenKeys = Object.keys(tokensLight) as SwirlTokenKey[];
  const tokensLightTyped = tokensLight as SwirlTokens;

  return lightTokenKeys
    .filter((key: SwirlTokenKey) => {
      const token = tokensLightTyped[key] as SwirlToken;

      return isColorToken(token);
    })
    .map((key: SwirlTokenKey) => tokensLightTyped[key]) as SwirlToken[];
}
