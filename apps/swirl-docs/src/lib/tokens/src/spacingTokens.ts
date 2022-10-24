import { SpacingTokenCategories, SpacingTokens } from "./token.model";

const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export const getSpacingTokens = (): SpacingTokens => {
  const spacingTokens: any = {
    spacing: [],
  };

  const lightTokenKeys = Object.keys(tokensLight);

  const isSpacingToken = (type: string) =>
    SpacingTokenCategories.includes(type);

  const basicTypographyTokens = lightTokenKeys
    .filter((key) => isSpacingToken(tokensLight[key].type))
    .map((key) => tokensLight[key]);

  basicTypographyTokens.forEach((token: any) => {
    spacingTokens[token.type]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
    });
  });

  return spacingTokens;
};
