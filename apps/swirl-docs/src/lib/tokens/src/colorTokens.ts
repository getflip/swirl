import { ColorTokenGroups, ColorTokens } from "./token.model";

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
    decoratives: [],
    core: [],
  };

  const lightTokenKeys = Object.keys(tokensLight);

  const baseTokens = lightTokenKeys
    .filter((key) => tokensLight[key].type === "color")
    .map((key) => tokensLight[key]);

  baseTokens.forEach((token) => {
    const colorCategory = getColorCategory(token);
    colorTokens[colorCategory]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
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
  } else if (token.name.includes("icon")) {
    return "icon";
  } else if (token.name.includes("decoratives")) {
    return "decoratives";
  } else {
    return "core";
  }
}
