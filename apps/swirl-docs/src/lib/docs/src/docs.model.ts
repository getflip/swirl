export enum DOCUMENTATION_SRC {
  PAGES = "pages",
  DOCUMENTATION = "documentation",
}

export type DocumentationCategory =
  | "components"
  | "tokens"
  | "icons"
  | "apiDocs";
export type DocumentationParamKey =
  | "componentDoc"
  | "tokenDoc"
  | "iconDoc"
  | "apiDoc";

export type StaticPathMapType = {
  [key in DocumentationCategory]: DocumentationParamKey;
};

export enum DOCUMENTATION_CATEGORY {
  COMPONENTS = "components",
  TOKENS = "tokens",
  ICONS = "icons",
  API_DOCS = "api",
}

export enum DOCUMENT_TYPE {
  COMPONENTS = "componentDoc",
  TOKENS = "tokenDoc",
  ICONS = "iconDoc",
  API_DOCS = "apiDoc",
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
  basePath: DOCUMENTATION_CATEGORY | string;
};

export type DocHeadline = {
  id: string;
  title: string;
  element: "H2" | "H3";
  children: DocHeadline[];
};

export type FrontMatter = {
  title: string;
  description: string;
  tags?: string[];
  variantsDescription?: string;
  innerHtml?: string;
  examples: ComponentExample[];
};

export type ComponentExample = {
  description: string;
  url: string;
  title: string;
};
