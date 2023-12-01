import type Operation from "oas/dist/operation";
import { CodeGenerator } from "../factories/CodeGeneratorFactory";

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: ProcessingData): void;
}

export type Endpoint = {
  title: string;
  operation: Operation;
  errorCodes?: {
    type: string;
    enum: Array<string>;
    "x-readme-ref-name": string;
  };
};
type Tag = string;
export type TaggedEndpointsMap = Record<Tag, Endpoint[]>;

export type EndpointErrorCollection = {
  endpoint: string;
  errorCodes?: Array<Endpoint["errorCodes"]>;
};
export type AllEndpointErrorCollections = Array<EndpointErrorCollection>;

export type GeneratedCode = {
  fileExtension: string;
  endpoint: string;
  language: string;
  code: string;
};

export type GeneratedCodeMap = Map<string, Array<GeneratedCode>>;

export interface ProcessingData {
  outputDirectory: string;
  sourcePath: string;
  codeGenerators: Array<CodeGenerator>;
  endpointErrorCollections?: AllEndpointErrorCollections;
  generatedCodeMap?: GeneratedCodeMap;
}
