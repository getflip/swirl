import path from "path";
import { ErrorCodeExtractorHandler } from "./handler/ErrorCodeExtractorHandler";
import { FileWriterHandler } from "./handler/FileWriterHandler";
import { CodeGeneratorHandler } from "./handler/CodeGeneratorHandler";
import { GeneratedCode, ProcessingData } from "./types";

export class ErrorCodeGenerator {
  private sourcePath: string = "";
  private outputDirectory: string = "";
  private languages: Array<GeneratedCode["language"]> = ["TypeScript"]; // default language

  constructor(languages: Array<GeneratedCode["language"]>) {
    this.languages = languages;
  }

  setSourcePath(sourcePath: string): ErrorCodeGenerator {
    this.sourcePath = sourcePath;
    return this;
  }

  setOutputDirectory(outputDirectory: string): ErrorCodeGenerator {
    this.outputDirectory = outputDirectory;
    return this;
  }

  generate() {
    if (!this.sourcePath || !this.outputDirectory) {
      throw new Error("Source path and output directory must be set");
    }

    const extractErrorCodes = new ErrorCodeExtractorHandler();
    const generateTypeScriptCode = new CodeGeneratorHandler();
    const writeFiles = new FileWriterHandler(); // TODO: Add support for other languages through a factory

    extractErrorCodes
      .setNext(extractErrorCodes)
      .setNext(generateTypeScriptCode)
      .setNext(writeFiles);

    const request: ProcessingData = {
      sourcePath: path.resolve(__dirname, this.sourcePath),
      outputDirectory: path.resolve(__dirname, this.outputDirectory),
      languages: this.languages,
    };

    extractErrorCodes.handle(request);
  }
}

// Usage Example:
const generator = new ErrorCodeGenerator(["TypeScript", "Dart"])
  .setSourcePath(
    "/Users/adam/Documents/dev/flip-corp/swirl/apps/swirl-docs/specs/merged.yml"
  )
  .setOutputDirectory(
    "/Users/adam/Documents/dev/flip-corp/swirl/generated-error-codes"
  )
  .generate();
