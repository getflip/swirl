import { ColorTokenGroups, ColorTokens } from "./token.model";
import { generateTokenValueWithUnit } from "./utils";

const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export const getColorTokens = (): ColorTokens => {
  const colorTokens: ColorTokens = {
    background: [],
    surface: [],
    border: [],
    action: [],
    interactive: [],
    text: [],
    icon: [],
  };

  const lightTokenKeys = Object.keys(tokensLight);

  const baseTokens = lightTokenKeys
    .filter((key) => tokensLight[key].type === "color" && !key.includes("core"))
    .map((key) => tokensLight[key]);

  baseTokens.forEach((token) => {
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
