import {
  BorderTokenCategories,
  SpacingTokenCategories,
  SwirlTokenCategory,
  SwirlTokensWithoutColor,
  Token,
  TokensWithoutColors,
  TypographyTokenCategories,
  ZIndexTokenCategories,
} from "./token.model";

import tokensLightFromPackage from "@getflip/swirl-tokens/dist/styles.light.json";

export const isTypographyToken = (token: SwirlTokenCategory) =>
  TypographyTokenCategories.includes(token);
export const isZindexToken = (token: SwirlTokenCategory) =>
  ZIndexTokenCategories.includes(token);
export const isBorderToken = (token: SwirlTokenCategory) =>
  BorderTokenCategories.includes(token);
export const isSpacingToken = (token: SwirlTokenCategory) =>
  SpacingTokenCategories.includes(token);
export const isColorIndex = (token: SwirlTokenCategory) => token === "color";

export type Dictionary = {
  [key: string]: any;
};

export function getTokens(
  tokenCategories: Array<SwirlTokenCategory>
): SwirlTokensWithoutColor {
  const tokensObject: SwirlTokensWithoutColor = {
    borderRadius: [],
    borderWidth: [],
    fontFamily: [],
    fontSizes: [],
    fontWeights: [],
    letterSpacing: [],
    lineHeights: [],
    spacing: [],
    zIndex: [],
    size: [],
  };

  tokenCategories.forEach((category) => {
    if (category !== "color") {
      tokensObject[category] = [];
    }
  });

  const lightTokenKeys = Object.keys(tokensLightFromPackage);
  const lightTokens = tokensLightFromPackage as Dictionary; // To get Typesafe import;

  const baseTokens = lightTokenKeys
    .filter((key) => tokenCategories.includes(lightTokens[key].type))
    .map((key: any) => lightTokens[key]);

  baseTokens.forEach((token: any) => {
    const tokenValueWithUnit = generateTokenValueWithUnit(token);

    tokensObject[token.type as TokensWithoutColors]?.push({
      name: token.name,
      type: token.type, // here it gets the type
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
      (tokenType[0] as TokensWithoutColors) || tokenType[0] === "fontWeights"
    )
  ) {
    return "typography-token-list";
  }
}
