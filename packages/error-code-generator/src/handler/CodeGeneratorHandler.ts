import CodeGeneratorFactory from "../factories/CodeGeneratorFactory";
import { Handler, ProcessingData } from "../types";

export class CodeGeneratorHandler implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: ProcessingData): void {
    request.languages.forEach((language) => {
      if (!request.generatedErrorCodes) {
        request.generatedErrorCodes = { [language]: [] };
      } else {
        request.generatedErrorCodes = {
          ...request.generatedErrorCodes,
          [language]: [],
        };
      }
      if (request.endpointErrorCollections) {
        request.endpointErrorCollections.forEach((endpointErrorCollection) => {
          const generator = CodeGeneratorFactory.createGenerator(
            "TypeScript",
            endpointErrorCollection
          );
          const code = generator.generateCode();

          if (request.generatedErrorCodes) {
            request.generatedErrorCodes[language]?.push(code);
          }
        });
      }
    });

    this.next?.handle(request);
  }
}
