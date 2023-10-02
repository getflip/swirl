import { EndpointErrorCollection, GeneratedCode } from "../../types";
import { DartGenerator } from "./DartGenerator";
import { TypeScriptGenerator } from "./TypeScriptGenerator";

export interface CodeGenerator {
  language: string;
  generateCode(): GeneratedCode;
  setEndpointErrorCollection(
    errorCollection: EndpointErrorCollection
  ): CodeGenerator;
}

export default class CodeGeneratorFactory {
  static createGenerator(language: "TypeScript" | "Dart"): CodeGenerator {
    switch (language) {
      case "TypeScript":
        return new TypeScriptGenerator();
      case "Dart":
        return new DartGenerator();
      default:
        throw new Error(
          `CodeGenerator not implemented for language: ${language}`
        );
    }
  }
}
