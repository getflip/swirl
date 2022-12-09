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
