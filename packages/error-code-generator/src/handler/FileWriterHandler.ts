import { Handler, Request } from "../";
import fs from "fs";

export class FileWriterHandler implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request): void {
    this.writeErrorCodesToFile(request);
  }

  private writeErrorCodesToFile(request: Request): void {
    if (request.generatedCode) {
      request.generatedCode.forEach((endpointErrorCodes) => {
        const { endpoint, errorObjects, errorTypes } = endpointErrorCodes;
        const fileName = `${endpoint}.ts`;

        const fileContent = `
          ${errorObjects.join("\n\n")}
          ${errorTypes.join("\n\n")}
        `;

        fs.writeFileSync(fileName, fileContent);
      });
    }
  }
}
