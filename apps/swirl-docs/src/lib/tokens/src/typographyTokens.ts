import { ColorTokenCategory, TypographyTokens } from "./token.model";

const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export const getTypographyTokens = (): TypographyTokens => {
  const typographyTokens: any = {
    fontWeights: [],
    lineHeights: [],
    letterSpacing: [],
    fontFamily: [],
    fontSizes: [],
  };

  const lightTokenKeys = Object.keys(tokensLight);

  const typographyTypes = [
    "fontWeights",
    "lineHeights",
    "letterSpacing",
    "fontFamily",
    "fontSizes",
  ];

  const isTypographyToken = (type: string) => typographyTypes.includes(type);

  const basicTypographyTokens = lightTokenKeys
    .filter((key) => isTypographyToken(tokensLight[key].type))
    .map((key) => tokensLight[key]);

  basicTypographyTokens.forEach((token: any) => {
    typographyTokens[token.type]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
    });
  });

  return typographyTokens;
};
