export const ALGOLIA_INDEX = {
  DEV: "dev_swirl-docs",
  PROD: "prod_swirl-docs",
} as const;
export type AlgoliaIndex = keyof typeof ALGOLIA_INDEX;

export type AlgoliaRecord = {
  objectID: string;
  title: string;
  type: "icon" | "token" | "component" | "apiDoc" | "apiSpec";
  tokenCategory?: "color" | "typography" | "z-index" | "border" | "spacing";
  excerpt?: string;
  path?: string;
  tagsCollection?: {
    tags: Array<string>;
  };
};
