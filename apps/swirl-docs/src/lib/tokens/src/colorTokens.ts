import { ColorTokenGroups, ColorTokens } from "./token.model";
import { Dictionary, generateTokenValueWithUnit } from "./utils";

import tokensLight from "@getflip/swirl-tokens/dist/styles.light.json";

export const getColorTokens = (): any => {
  const colorTokens: any = {
    background: [],
    surface: [],
    border: [],
    action: [],
    interactive: [],
    text: [],
    icon: [],
  };

  const lightTokenKeys = Object.keys(tokensLight) as any;
  const tokensLightTyped = tokensLight as Dictionary;

  const baseTokens = lightTokenKeys
    .filter((key: any) => {
      return tokensLightTyped[key].type === "color" && !key.includes("core");
    })
    .map((key: any) => tokensLightTyped[key]);

  baseTokens.forEach((token: any) => {
    const tokenValueWithUnit = generateTokenValueWithUnit(token);

    const colorCategory = getColorCategory(token);
    colorTokens[colorCategory]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
      valueAsString: tokenValueWithUnit?.value,
      unitAsString: tokenValueWithUnit?.unit,
    });
  });

  return colorTokens;
};

// TODO: refactor this function to use better mapping
function getColorCategory(token: any): ColorTokenGroups {
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
