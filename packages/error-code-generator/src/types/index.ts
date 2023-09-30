import type Operation from "oas/dist/operation";

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
  endpoint: string;
  language: "TypeScript" | "Dart";
  code: string;
};

export interface ProcessingData {
  outputDirectory: string;
  sourcePath: string;
  languages: Array<GeneratedCode["language"]>;
  endpointErrorCollections?: AllEndpointErrorCollections; // Will be set by the ErrorCodeExtractorHandler
  generatedErrorCodes?: Partial<
    Record<GeneratedCode["language"], Array<GeneratedCode>>
  >; // Will be set by the CodeGeneratorHandler
}
