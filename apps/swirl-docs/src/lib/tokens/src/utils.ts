import {
  BorderTokenCategories,
  SpacingTokenCategories,
  SwirlTokensWithoutColor,
  Token,
  TokensWithoutColors,
  TypographyTokenCategories,
  ZIndexTokenCategories,
} from "./token.model";

import tokensLight from "@getflip/swirl-tokens/dist/styles.light.json";

export const isTypographyToken = (token: string) =>
  TypographyTokenCategories.includes(token);
export const isZindexToken = (token: string) =>
  ZIndexTokenCategories.includes(token);
export const isBorderToken = (token: string) =>
  BorderTokenCategories.includes(token);
export const isSpacingToken = (token: string) =>
  SpacingTokenCategories.includes(token);
export const isColorIndex = (token: string) => token === "color";

type tokenblableblubb = {
  [K in Token["type"]]: Token;
};
export function getTokens(
  tokenCategories: Array<TokensWithoutColors>
): SwirlTokensWithoutColor {
  const tokensObject: any = {};
  tokenCategories.forEach((category) => {
    tokensObject[category] = [];
  });

  const lightTokenKeys = Object.keys(tokensLight);

  const baseTokens = lightTokenKeys
    .filter((key) => tokenCategories.includes(tokensLight[key].type))
    .map((key) => tokensLight[key]);

  baseTokens.forEach((token: any) => {
    const tokenValueWithUnit = generateTokenValueWithUnit(token);

    tokensObject[token.type]?.push({
      name: token.name,
      type: token.type,
      value: token.value,
      valueAsString: tokenValueWithUnit?.value,
      unitAsString: tokenValueWithUnit?.unit,
      description: token.comment,
    });
  });

  return tokensObject;
}

type TokenValueWithUnit = {
  value: string;
  unit: string;
};

export function generateTokenValueWithUnit(
  token: any
): TokenValueWithUnit | undefined {
  const { value, type } = token;

  if (typeof value === "string") {
    const number = value.match(/\d+/g);
    const numberString = number?.join(".");
    const unit = value.match(/[a-z]+/g);
    if (type === "color") {
      const rgbValues = value.match(/\d+/g)?.join(", ");

      if (rgbValues) {
        return {
          value: rgbValues,
          unit: "rgba",
        };
      }
    }

    if (TypographyTokenCategories.includes(type)) {
      if (numberString && unit) {
        return {
          value: numberString,
          unit: unit[0],
        };
      }
    }

    if (
      BorderTokenCategories.includes(type) ||
      SpacingTokenCategories.includes(type)
    ) {
      if (numberString && unit) {
        return {
          value: numberString,
          unit: "rem",
        };
      }
    }

    if (ZIndexTokenCategories.includes(type)) {
      return {
        value: value,
        unit: "Z-Index",
      };
    }
  }

  if (typeof value === "number") {
    if (type === "fontWeights") {
      return {
        value: value.toString(),
        unit: "Weight",
      };
    }

    return {
      value: value.toString(),
      unit: "rem",
    };
  }
}

export function getColsString(tokens: Token[]) {
  const tokenType = tokens.map((token) => {
    return token.type;
  });

  if (tokenType[0] === "color") {
    return "color-token-list";
  }

  if (
    TypographyTokenCategories.includes(
      tokenType[0] || tokenType[0] === "fontWeights"
    )
  ) {
    return "typography-token-list";
  }
}
