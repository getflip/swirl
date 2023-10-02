import fs from "fs";
import { GeneratedCode, Handler, ProcessingData } from "../types";
import prettier from "prettier";
import { formatCode } from "../factories/FormaterFactory";

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
      for (const [code, generatedCodes] of request.generatedCodeMap.entries()) {
        generatedCodes.forEach((generatedCode) => {
          const { code, endpoint, language } = generatedCode;
          const fileName = `${endpoint}.ts`;

          const formattedCode = formatCode(language, code);

          if (!fs.existsSync(`${request.outputDirectory}`)) {
            fs.mkdirSync(`${request.outputDirectory}`);
          }

          if (!fs.existsSync(`${request.outputDirectory}/${language}`)) {
            fs.mkdirSync(`${request.outputDirectory}/${language}`);
          }

          fs.writeFileSync(
            `${request.outputDirectory}/${language}/${fileName}`,
            formattedCode
          );
        });
      }
    }
  }
}
