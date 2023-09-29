import { CodeGeneratorFactory } from "../factories/CodeGeneratorFactory";
import { Handler, ProcessingData } from "../types";

export class TypeScriptCodeGeneratorHandler implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: ProcessingData): void {
    if (request.endpointErrorCollections) {
      request.endpointErrorCollections.forEach((endpointErrorCollection) => {
        const generator = CodeGeneratorFactory.createGenerator(
          "TypeScript",
          endpointErrorCollection
        );
        const code = generator.generateCode();

        if (!request.generatedErrorCodes) {
          request.generatedErrorCodes = [];
        }

        request.generatedErrorCodes?.push(code);
      });

      this.next?.handle(request);
    }
  }
}
