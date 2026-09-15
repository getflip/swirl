export type SwirlResourceListItemLabelWeight =
  | "medium"
  | "regular"
  | "semibold"
  | "bold";

export type SwirlResourceListItemAriaCurrent =
  | "page"
  | "step"
  | "location"
  | "date"
  | "time"
  | "true";

export const swirlResourceListItemRel = {
  external: "external",
  nofollow: "nofollow",
  noindex: "noindex",
  noopener: "noopener",
  noopenerNoreferrer: "noopener noreferrer",
  noreferrer: "noreferrer",
} as const;

export type SwirlResourceListItemRel =
  (typeof swirlResourceListItemRel)[keyof typeof swirlResourceListItemRel];

export type SwirlResourceListItemTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top";
