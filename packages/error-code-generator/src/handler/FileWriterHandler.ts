import fs from "fs";
import { Handler, ProcessingData } from "../types";
import prettier from "prettier";

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
    if (request.generatedErrorCodes) {
      request.generatedErrorCodes.forEach((generatedErrorCode) => {
        const { code, endpoint, language } = generatedErrorCode;
        const fileName = `${endpoint}.ts`;

        const formattedCode = prettier.format(code, { parser: "typescript" });

        if (!fs.existsSync(`${request.outputDirectory}`)) {
          fs.mkdirSync(`${request.outputDirectory}`);
        }

        if (!fs.existsSync(`${request.outputDirectory}/${language}`)) {
          fs.mkdirSync(`${request.outputDirectory}/${language}`);
        }

        fs.writeFileSync(
          `${request.outputDirectory}/typescript/${fileName}`,
          formattedCode
        );
      });
    }
  }
}
