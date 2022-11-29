export enum DOCUMENTATION_SRC {
  PAGES = "pages",
  DOCUMENTATION = "documentation",
}

export enum BASE_PATHS {
  COMPONENTS = "components",
  TOKENS = "tokens",
  ICONS = "icons",
}

export enum DOCUMENT_ENUM {
  COMPONENTS = "componentDoc",
  TOKENS = "tokenDoc",
  ICONS = "iconDoc",
}

export type DocCategory = {
  name: string;
  path: string;
  htmlTag?: string;
  nextRoute?: string;
  subpages?: DocCategory[];
};

export type Document = {
  name: string;
  basePath: BASE_PATHS | string;
};

export type DocHeadline = {
  id: string;
  name: string;
  level?: number;
};
