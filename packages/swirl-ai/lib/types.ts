export interface CustomElementsManifest {
  schemaVersion: string;
  modules: Module[];
}

export interface Module {
  kind: string;
  path: string;
  declarations?: Declaration[];
  exports?: unknown[];
}

export interface Declaration {
  kind: string;
  customElement?: boolean;
  tagName?: string;
  name?: string;
  description?: string;
  attributes?: Attribute[];
  members?: Member[];
  [key: string]: unknown;
}

export interface Attribute {
  name: string;
  fieldName?: string;
  type?: { text: string; references?: unknown[] };
  default?: string;
  [key: string]: unknown;
}

export interface Member {
  kind: string;
  name: string;
  attribute?: string;
  type?: { text: string; references?: unknown[] };
  default?: string;
  [key: string]: unknown;
}

export interface ExtractedDocs {
  description: string;
  accessibility: string;
}
