const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export function getTokens(tokenCategories: string[]) {
  const tokensObject: any = {};
  tokenCategories.forEach((category) => {
    tokensObject[category] = [];
  });

  const lightTokenKeys = Object.keys(tokensLight);

  const baseTokens = lightTokenKeys
    .filter((key) => tokenCategories.includes(tokensLight[key].type))
    .map((key) => tokensLight[key]);

  baseTokens.forEach((token: any) => {
    tokensObject[token.type]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      description: token.comment,
    });
  });

  return tokensObject;
}
