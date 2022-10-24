import { ZIndexTokenCategories, ZIndexTokens } from "./token.model";

const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export const getZIndexTokens = (): ZIndexTokens => {
  const zIndexTokens: any = {
    zIndex: [],
  };

  const lightTokenKeys = Object.keys(tokensLight);

  const isZIndexToken = (type: string) => ZIndexTokenCategories.includes(type);

  const baseTokens = lightTokenKeys
    .filter((key) => isZIndexToken(tokensLight[key].type))
    .map((key) => tokensLight[key]);

  baseTokens.forEach((token: any) => {
    zIndexTokens["zIndex"]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
    });
  });

  return zIndexTokens;
};
