import { EndpointErrorCollection, GeneratedCode } from "../../types";
import { DartGenerator } from "./DartGenerator";
import { TypeScriptGenerator } from "./TypeScriptGenerator";

export interface CodeGenerator {
  generateCode(): GeneratedCode;
}

// CodeGenerator Factory
export class CodeGeneratorFactory {
  static createGenerator(
    language: string,
    errorCodes: EndpointErrorCollection
  ): CodeGenerator {
    switch (language) {
      case "TypeScript":
        return new TypeScriptGenerator(errorCodes);
      case "Dart":
        return new DartGenerator(errorCodes);
      default:
        throw new Error(
          `CodeGenerator not implemented for language: ${language}`
        );
    }
  }
}
