import path from "path";
import { CodeGeneratorHandler } from "./handler/CodeGeneratorHandler";
import { ErrorCodeExtractorHandler } from "./handler/ErrorCodeExtractorHandler";
import { FileWriterHandler } from "./handler/FileWriterHandler";
import { ProcessingData } from "./types";

export * from "./factories/CodeGeneratorFactory";
export class ErrorCodeGenerator {
  private sourcePath: string = "";
  private outputDirectory: string = "";
  private codeGenerators: ProcessingData["codeGenerators"] = [];

  constructor(codeGenerators: ProcessingData["codeGenerators"]) {
    this.codeGenerators = codeGenerators;
  }

  setSourcePath(sourcePath: string): ErrorCodeGenerator {
    this.sourcePath = sourcePath;
    return this;
  }

  setOutputDirectory(outputDirectory: string): ErrorCodeGenerator {
    this.outputDirectory = outputDirectory;
    return this;
  }

  // We don't need this for now, but adds flexibility for the future
  addCodeGenerators(
    codeGenerators: ProcessingData["codeGenerators"]
  ): ErrorCodeGenerator {
    this.codeGenerators = [...this.codeGenerators, ...codeGenerators];
    return this;
  }

  generate() {
    if (!this.sourcePath || !this.outputDirectory || !this.codeGenerators) {
      throw new Error(
        "Source path, output directory and code generators must be set"
      );
    }

    const extractErrorCodes = new ErrorCodeExtractorHandler();
    const generateTypeScriptCode = new CodeGeneratorHandler();
    const writeFiles = new FileWriterHandler();

    extractErrorCodes
      .setNext(extractErrorCodes)
      .setNext(generateTypeScriptCode)
      .setNext(writeFiles);

    const request: ProcessingData = {
      sourcePath: path.resolve(__dirname, this.sourcePath),
      outputDirectory: path.resolve(__dirname, this.outputDirectory),
      codeGenerators: this.codeGenerators,
    };

    extractErrorCodes.handle(request);
  }
}

// Usage Example
// const generator = new ErrorCodeGenerator([
//   CodeGeneratorFactory.createGenerator("TypeScript"),
//   CodeGeneratorFactory.createGenerator("Dart"),
// ])
//   .setSourcePath(
//     "/Users/adam/Documents/dev/flip-corp/swirl/apps/swirl-docs/specs/merged.yml"
//   )
//   .setOutputDirectory(
//     "/Users/adam/Documents/dev/flip-corp/swirl/generated-error-codes"
//   )
//   .generate();
