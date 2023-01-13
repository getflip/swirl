export const ALGOLIA_INDEX = {
  DEV: "dev_swirl-docs",
  PROD: "prod_swirl-docs",
} as const;
export type AlgoliaIndex = keyof typeof ALGOLIA_INDEX;
