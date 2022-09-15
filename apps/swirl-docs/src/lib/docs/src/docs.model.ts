export enum DOCUMENTATION_SRC {
  PAGES = "pages",
  DOCUMENTATION = "documentation",
}

export type BasePath = "components" | "tokens" | "icons";

export type DocCategory = {
  name: string;
  path: string;
  htmlTag?: string;
  nextRoute?: string;
  subpages?: DocCategory[];
};

export type Document = {
  name: string;
  basePath: BasePath | string;
};

export type DocHeadline = {
  id: string;
  name: string;
  level?: number;
};
