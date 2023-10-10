import { EndpointErrorCollection, GeneratedCode } from "../../types";
import { DartGenerator } from "./DartGenerator";
import { TypeScriptGenerator } from "./TypeScriptGenerator";

// Base interface
export interface BaseCodeGenerator {
  language: string;
  fileExtension: string;
  generateCode(): GeneratedCode;
  setEndpointErrorCollection(
    errorCollection: EndpointErrorCollection,
  ): CodeGenerator;
}

// Extended interface for generators with index file rendering
export interface CodeGeneratorWithIndex extends BaseCodeGenerator {
  hasIndexFileRendering: true;
  generateIndexCode(): GeneratedCode;
}

// Interface for generators without index file rendering
export interface CodeGeneratorWithoutIndex extends BaseCodeGenerator {
  hasIndexFileRendering?: false;
}

// Union type that includes both possible generator types
export type CodeGenerator = CodeGeneratorWithIndex | CodeGeneratorWithoutIndex;

// Type guard to check if a generator has index file rendering
export function hasIndexFileRendering(
  generator: CodeGenerator,
): generator is CodeGeneratorWithIndex {
  return generator.hasIndexFileRendering === true;
}

export class CodeGeneratorFactory {
  static createGenerator(language: "TypeScript" | "Dart"): CodeGenerator {
    switch (language) {
      case "TypeScript":
        return new TypeScriptGenerator();
      case "Dart":
        return new DartGenerator();
      default:
        throw new Error(
          `CodeGenerator not implemented for language: ${language}`,
        );
    }
  }
}
