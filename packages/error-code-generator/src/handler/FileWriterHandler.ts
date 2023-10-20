import fs from "fs";
import { formatCode } from "../factories/FormaterFactory";
import { Handler, ProcessingData } from "../types";

export class FileWriterHandler implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: ProcessingData): void {
    this.writeErrorCodesToFile(request);
  }

  private writeErrorCodesToFile(request: ProcessingData): void {
    if (request.generatedCodeMap) {
      for (const [_, generatedCodes] of request.generatedCodeMap.entries()) {
        generatedCodes.forEach(async (generatedCode) => {
          const { code, endpoint, language, fileExtension } = generatedCode;
          const fileName = `${endpoint}.${fileExtension}`;

          if (!fs.existsSync(`${request.outputDirectory}`)) {
            fs.mkdirSync(`${request.outputDirectory}`);
          }

          if (!fs.existsSync(`${request.outputDirectory}/${language}`)) {
            fs.mkdirSync(`${request.outputDirectory}/${language}`);
          }

          const formattedCode = await formatCode(language, code);

          fs.writeFileSync(
            `${request.outputDirectory}/${language}/${fileName}`,
            formattedCode,
          );
        });
      }
    }
  }
}
