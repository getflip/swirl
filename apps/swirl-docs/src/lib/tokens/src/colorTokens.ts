import {
  ColorTokenGroups,
  SwirlColorToken,
  SwirlToken,
  SwirlTokenKey,
  SwirlTokens,
  Token,
} from "./token.model";
import { generateTokenValueWithUnit } from "./utils";
import tokensLight from "@getflip/swirl-tokens/dist/styles.light.json";

type ColorTokenGroup = Record<ColorTokenGroups, Token[]>;

function isColorToken(token: SwirlToken): token is SwirlColorToken {
  return token.type === "color" && !token.name.includes("core");
}

function hasComment(token: SwirlToken): token is SwirlToken {
  return "comment" in token;
}

function getBaseTokens(): SwirlToken[] {
  const lightTokenKeys = Object.keys(tokensLight) as SwirlTokenKey[];
  const tokensLightTyped = tokensLight as SwirlTokens;

  return lightTokenKeys
    .filter((key: SwirlTokenKey) => {
      const token = tokensLightTyped[key] as SwirlToken;

      return hasComment(token) && isColorToken(token);
    })
    .map((key: SwirlTokenKey) => tokensLightTyped[key]) as SwirlToken[];
}

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

  const baseTokens = getBaseTokens();

  baseTokens.forEach((token) => {
    const tokenValueWithUnit = generateTokenValueWithUnit(token);

    const colorToken = isColorToken(token) ? token : null;

    if (!colorToken) {
      return;
    }

    const colorTokenGroup = getColorCategory(colorToken);
    colorTokens[colorTokenGroup]?.push({
      name: token.name,
      type: "color",
      value: String(token.value),
      description: String(token.comment),
      valueAsString: tokenValueWithUnit?.value,
      unitAsString: tokenValueWithUnit?.unit,
    });
  });

  return colorTokens;
}

// TODO: refactor this function to use better mapping
function getColorCategory(token: SwirlColorToken): ColorTokenGroups {
  if (token.name.includes("background")) {
    return "background";
  } else if (token.name.includes("surface")) {
    return "surface";
  } else if (token.name.includes("border")) {
    return "border";
  } else if (token.name.includes("action")) {
    return "action";
  } else if (token.name.includes("interactive")) {
    return "interactive";
  } else if (token.name.includes("text")) {
    return "text";
  } else {
    return "icon";
  }
}
