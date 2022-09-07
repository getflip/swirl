import { readFileSync, writeFileSync } from "fs";
import hexToRgba from "hex-to-rgba";

type Theme = "light" | "dark";

type FigmaCategory = {
  [categoryOrTokenName: string]: FigmaToken | FigmaCategory;
};

type FigmaToken = {
  description?: string;
  type: string;
  value: string | number;
};

type FigmaSet = {
  [categoryOrTokenName: string]: FigmaToken | FigmaCategory;
};

type FigmaExport = {
  [setName: string]: FigmaSet;
};

type StyleDictionaryToken = {
  comment?: string;
  type?: string;
  value: string | number;
};

type StyleDictionaryTokens = {
  [tokenName: string]: StyleDictionaryToken;
};

const fontWeightMappings: { [key: string]: number } = {
  Regular: 400,
  Medium: 500,
  "Semi Bold": 600,
  Bold: 700,
};

figmaTokensToStyleDictionary("light");
figmaTokensToStyleDictionary("dark");

/**
 * Loads the figma-tokens.json, converts it to the StyleDictionary format,
 * writes it to tokens/tokens.{theme}.json.
 * @param theme
 */
export function figmaTokensToStyleDictionary(theme: Theme) {
  const figmaExport = getFigmaExport(theme);
  const normalizedFigmaExport = normalizeFigmaExport(figmaExport);
  const styleDictionaryTokens = getStyleDictionaryTokens(normalizedFigmaExport);

  writeStyleDictionaryTokenFile(theme, styleDictionaryTokens);
}

/**
 * Loads the figma-tokens.json file and removes all sets not relevant for the
 * current theme.
 * @param theme
 * @returns
 */
function getFigmaExport(theme: Theme): FigmaExport {
  const figmaExport = JSON.parse(
    readFileSync("./figma-tokens.json").toString()
  );

  return {
    core: figmaExport.core,
    "core-colors": figmaExport["core-colors"],
    [theme]: figmaExport[theme],
  };
}

/**
 * Returns all relevant Figma token sets, excluding meta data sets.
 * @param figmaExport
 * @returns
 */
function getFigmaTokenSets(figmaExport: FigmaExport) {
  return Object.entries(figmaExport)
    .filter(([key]) => !key.startsWith("$"))
    .map(([key, set]) => ({ key, set }));
}

/**
 * Normalizes the Figma export by normalizing all sets.
 * @param figmaExport
 * @returns
 */
function normalizeFigmaExport(figmaExport: FigmaExport): FigmaExport {
  const figmaTokenSets = getFigmaTokenSets(figmaExport);

  const sets: FigmaExport = {};

  for (const figmaTokenSet of figmaTokenSets) {
    sets[figmaTokenSet.key] = normalizeFigmaSet(figmaTokenSet.set);
  }

  return sets;
}

/**
 * Returns a normalized Figma token set, by removing all "complex" sets like
 * Figma typesets.
 * @param figmaSet
 * @returns
 */
function normalizeFigmaSet(figmaSet: FigmaSet): FigmaCategory {
  const normalizedSet: FigmaSet = {};

  for (const [key, figmaCategory] of Object.entries(figmaSet)) {
    // we remove 'complex' token categories like Figma Typesets by ignoring
    // categories with object-typed values
    if (typeof figmaCategory?.value !== "object") {
      normalizedSet[key] = figmaCategory;
    }
  }

  return normalizedSet;
}

/**
 * Traverses all nested Figma token categories and tokens, and calls the token
 * transformation.
 * @param figmaExport
 * @returns
 */
function getStyleDictionaryTokens(
  figmaExport: FigmaExport
): StyleDictionaryTokens {
  const figmaTokenSets = getFigmaTokenSets(figmaExport);

  let styleDictionaryTokens: StyleDictionaryTokens = {};

  for (const figmaTokenSet of figmaTokenSets) {
    styleDictionaryTokens = {
      ...styleDictionaryTokens,
      ...traverseFigmaTokenCategories(figmaTokenSet.set),
    };
  }

  for (const [key, styleDictionaryToken] of Object.entries(
    styleDictionaryTokens
  )) {
    styleDictionaryTokens[key] = transformTokenValues(styleDictionaryToken);
  }

  return styleDictionaryTokens;
}

/**
 * Pulls all tokens from nested categories and returns a flattened list of
 * tokens.
 * @param parent
 * @param hierarchy
 * @returns
 */
function traverseFigmaTokenCategories(
  parent: FigmaToken | FigmaCategory,
  hierarchy: string[] = []
): { [key: string]: FigmaToken } {
  const newFigmaTokens = Object.entries(parent).filter(
    ([, tokenOrCategory]) => tokenOrCategory.value !== undefined
  );

  const newFigmaCategories = Object.entries(parent).filter(
    ([, tokenOrCategory]) => tokenOrCategory.value === undefined
  );

  const newFlattenedFigmaTokens = newFigmaTokens.reduce(
    (newFigmaTokens, [key, newFigmaToken]) => ({
      ...newFigmaTokens,
      [`${hierarchy.join("-")}-${camelCaseToKebabCase(key)}`.replace(/^-/, "")]:
        {
          ...newFigmaToken,
          comment: newFigmaToken.description,
          description: undefined,
          value: newFigmaToken.value.startsWith("{")
            ? newFigmaToken.value.replaceAll(".", "-")
            : newFigmaToken.value,
        },
    }),
    {}
  );

  const nestedTokens = newFigmaCategories
    .map(([key, newFigmaCagegory]) =>
      traverseFigmaTokenCategories(newFigmaCagegory, [...hierarchy, key])
    )
    .reduce((flat, category) => ({ ...flat, ...category }), {});

  return {
    ...newFlattenedFigmaTokens,
    ...nestedTokens,
  };
}

/**
 * Transforms token values according to the token's type.
 * @param token
 * @returns
 */
function transformTokenValues(
  token: StyleDictionaryToken
): StyleDictionaryToken {
  if (String(token.value).startsWith("{") || !token.type) {
    return token;
  }

  if (token.type === "color") {
    return {
      ...token,
      value: hexToRgba(String(token.value)),
    };
  }

  if (
    [
      "borderRadius",
      "borderWidth",
      "fontSizes",
      "letterSpacing",
      "lineHeights",
      "spacing",
    ].includes(token.type)
  ) {
    return {
      ...token,
      value: token.value === "0" ? 0 : `${+token.value / 16}rem`,
    };
  }

  if (token.type === "fontWeights") {
    return { ...token, value: fontWeightMappings[token.value] };
  }

  if (token.type === "textDecoration") {
    return { ...token, value: String(token.value).toLowerCase() };
  }

  return token;
}

/**
 * Transforms camelCase strings to kebab-case.
 * @param term
 * @returns
 */
function camelCaseToKebabCase(term: string): string {
  return term.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  );
}

/**
 * Writes the Style Dictionary tokens file.
 * @param theme
 * @param tokens
 */
function writeStyleDictionaryTokenFile(
  theme: Theme,
  tokens: StyleDictionaryTokens
) {
  writeFileSync(
    `./tokens/tokens.${theme}.json`,
    JSON.stringify(tokens, undefined, 2)
  );
}
