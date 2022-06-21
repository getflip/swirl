import type { Tokens, TokenGroup } from "./tokens";

const BASE_FONT_SIZE = 16;

function rem(value: string) {
  return value.replace(
    /\d+(?:\.\d+|\d*)px/g,
    (px: string) => `${parseInt(px, 10) / BASE_FONT_SIZE}rem`
  );
}

export function tokensToRems(tokenGroup: TokenGroup): TokenGroup {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([token, values]) => [
      token,
      { ...values, value: rem(values.value) },
    ])
  );
}

export function createVar(token: string) {
  return `--s-${token}`;
}

/**
 * Allowed Swirl token custom properties.
 *
 * Result: ['--s-background', '--s-text', etc...]
 */
export function getCustomPropertyNames(tokens: Tokens) {
  const { colorSchemes, ...restTokenGroups } = tokens;
  const customPropertyNames = [
    ...Object.keys(colorSchemes.light).map((token) => createVar(token)),
    ...Object.entries(restTokenGroups)
      .map(([_, tokenGroup]: [string, TokenGroup]) =>
        Object.keys(tokenGroup).map((token) => createVar(token))
      )
      .flat(),
  ];

  return customPropertyNames;
}
