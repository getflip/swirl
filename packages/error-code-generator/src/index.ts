import path from "path";
import { ErrorCodeExtractorHandler } from "./handler/ErrorCodeExtractorHandler";
import { FileWriterHandler } from "./handler/FileWriterHandler";
import { TypeScriptCodeGeneratorHandler } from "./handler/TypeScriptCodeGeneratorHandler";
import { GeneratedCode, ProcessingData } from "./types";

export class ErrorCodeGenerator {
  private sourcePath: string = "";
  private outputDirectory: string = "";
  private language: string = "TypeScript"; // default language

  constructor(language: GeneratedCode["language"]) {
    this.language = language;
  }

  setSourcePath(sourcePath: string): ErrorCodeGenerator {
    this.sourcePath = sourcePath;
    return this;
  }

  setOutputDirectory(outputDirectory: string): ErrorCodeGenerator {
    this.outputDirectory = outputDirectory;
    return this;
  }

  generate(): void {
    // Validate inputs
    if (!this.sourcePath || !this.outputDirectory) {
      throw new Error("Source path and output directory must be set");
    }

    // Initialize handlers
    const extractErrorCodes = new ErrorCodeExtractorHandler();
    const generateTypeScriptCode = new TypeScriptCodeGeneratorHandler(); // TODO: Add support for other languages through a factory
    const writeFiles = new FileWriterHandler(); // TODO: Add support for other languages through a factory

    // Chain handlers
    extractErrorCodes
      .setNext(extractErrorCodes)
      .setNext(generateTypeScriptCode)
      .setNext(writeFiles);

    // Create and configure request
    const request: ProcessingData = {
      sourcePath: path.resolve(__dirname, this.sourcePath),
      outputDirectory: path.resolve(__dirname, this.outputDirectory),
    };

    // Start the process
    extractErrorCodes.handle(request);
  }
}

// Usage Example:
const generator = new ErrorCodeGenerator("TypeScript")
  .setSourcePath(
    "/Users/adam/Documents/dev/flip-corp/swirl/apps/swirl-docs/specs/merged.yml"
  )
  .setOutputDirectory(
    "/Users/adam/Documents/dev/flip-corp/swirl/generated-error-codes"
  )
  .generate();
