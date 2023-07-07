import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Oas, { Operation } from "oas";
import { HttpMethods, OASDocument } from "oas/dist/rmoas.types";
import { OpenAPIV3_1 } from "openapi-types/dist";
import OASBuilder from "./oasBuilder";
import { CodePreviewSelectOptions } from "src/components/CodePreview/types";

export enum DOCUMENTATION_SRC {
  PAGES = "pages",
  DOCUMENTATION = "documentation",
}

export type DocumentationCategory = "components" | "tokens" | "icons" | "api";
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
  API_DOCS = "apiDocs",
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
  subdirectories?: DocCategory[];
};

export type Document = {
  name: string;
  basePath: DOCUMENTATION_CATEGORY | string;
  documentationSrc: DOCUMENTATION_SRC;
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
  responseExamples: CodePreviewSelectOptions;
  requestBodySchema: OpenAPIV3_1.BaseSchemaObject | null;
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
