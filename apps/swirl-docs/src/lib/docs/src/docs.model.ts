import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Oas, { Operation } from "oas";
import { HttpMethods, OASDocument } from "oas/dist/rmoas.types";
import { OpenAPIV3_1 } from "openapi-types/dist";
import { CodePreviewSelectOptions } from "src/components/CodePreview/types";
import OASBuilder from "./oasBuilder";

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
  errorCodes?: {
    type: string;
    enum: Array<string>;
    "x-readme-ref-name": string;
  };
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

export type OperationSchemaObject = {
  name: string;
  type:
    | OpenAPIV3_1.ArraySchemaObjectType
    | OpenAPIV3_1.NonArraySchemaObjectType;
  description: string;
  required: boolean;
  properties?: OperationSchemaObject[];
  items?: any;
  statusCode?: string;
};

export type OperationParamType =
  | "path"
  | "query"
  | "header"
  | "cookie"
  | "body"
  | "formData"
  | "response"
  | "other";

export type OperationSchemas = Array<{
  type: OperationParamType;
  title: string;
  parameters: Array<OperationSchemaObject>;
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
  id?: string;
  title: string;
  description: string;
  path: string;
  method?: HttpMethods;
  request: ReturnType<OASBuilder["generateRequest"]>;
  responseExamples: CodePreviewSelectOptions;
  responseBodySchemas: Array<ResponseBodySchema>;
  isDeprecated?: boolean;
  isExperimental?: boolean;
  isInternal?: boolean;
  parameters?: OperationSchemas;
  requestBody?: OperationSchemas;
  responseBody?: OperationSchemas;
  security?: OpenAPIV3_1.SecurityRequirementObject[];
  globalErrorCodes?: string[];
};

export interface ApiDocumentation {
  id?: string;
  title: string;
  resources: Array<ApiResourceDocumentation>;
}

export interface ApiResourceDocumentation {
  id?: string;
  title: string;
  shortDescription: string;
  description?: MDXRemoteSerializeResult;
  endpoints: Array<ApiEndpoint>;
}
