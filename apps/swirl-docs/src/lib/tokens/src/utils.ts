const tokensLight = require("@getflip/swirl-tokens/dist/styles.light.json");

export function getTokens(
  tokensObject: any,
  filterFunction: (type: string) => boolean
) {
  const lightTokenKeys = Object.keys(tokensLight);

  const baseTokens = lightTokenKeys
    .filter((key) => filterFunction(tokensLight[key].type))
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
