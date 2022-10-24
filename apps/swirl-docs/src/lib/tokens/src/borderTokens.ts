import { BorderTokenCategories, BorderTokens } from "./token.model";

const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export const getBorderTokens = (): BorderTokens => {
  const borderTokens: any = {
    borderRadius: [],
    borderWidth: [],
  };

  const lightTokenKeys = Object.keys(tokensLight);

  const isBorderToken = (type: string) => BorderTokenCategories.includes(type);

  const basicTypographyTokens = lightTokenKeys
    .filter((key) => isBorderToken(tokensLight[key].type))
    .map((key) => tokensLight[key]);

  basicTypographyTokens.forEach((token: any) => {
    borderTokens[token.type]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
    });
  });

  return borderTokens;
};
