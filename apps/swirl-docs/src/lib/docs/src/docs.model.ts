import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Oas, { Operation } from "oas";
import { HttpMethods, OASDocument } from "oas/dist/rmoas.types";
import { OpenAPIV3_1 } from "openapi-types/dist";
import OASBuilder from "./oasBuilder";

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

export type Endpoint = {
  title: string;
  path: string;
  operation: Operation;
};

export type Operations = {
  [K in HttpMethods]?: Endpoint[];
};

export type ApiDoc = {
  title: string;
  shortDescription: string;
  path: string;
  definition?: OASDocument;
  oas?: Oas;
  operations?: Operations;
};

export type EndpointParam = {
  name: string;
  type: string;
  description: string;
  required: boolean;
};

export type EndpointParamType =
  | "path"
  | "query"
  | "header"
  | "cookie"
  | "body"
  | "other";

export type EndpointParamTypeGroup = Array<{
  type: EndpointParamType;
  title: string;
  parameters: Array<EndpointParam>;
}>;

export type ApiResponseExample = {
  status: string;
  mediaType: string;
  value: unknown;
};

export type ResponseBodySchema = {
  schema: OpenAPIV3_1.BaseSchemaObject;
  statusCode: string;
};

export type ApiEndpoint = {
  title: string;
  description: string;
  path: string;
  request: ReturnType<OASBuilder["generateRequest"]>;
  requestBodySchema: OpenAPIV3_1.BaseSchemaObject | null;
  responseExamples: Array<ApiResponseExample>;
  responseBodySchemas: Array<ResponseBodySchema>;
  isDeprecated?: boolean;
  parameterTypes?: EndpointParamTypeGroup;
  security?: OpenAPIV3_1.SecurityRequirementObject[];
};

export type ApiDocumentation = {
  title: string;
  shortDescription: string;
  description: MDXRemoteSerializeResult;
  endpoints: Array<ApiEndpoint>;
};
