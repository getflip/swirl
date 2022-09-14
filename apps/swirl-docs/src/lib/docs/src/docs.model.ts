export type DocCategory = {
  name: string;
  path: string;
  htmlTag?: string;
  nextRoute?: string;
  subpages?: any;
};

export type Document = {
  name: string;
  basePath: string;
};

export type DocHeadline = {
  id: string;
  name: string;
  level?: number;
};
