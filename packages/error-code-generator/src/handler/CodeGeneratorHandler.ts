import CodeGeneratorFactory from "../factories/CodeGeneratorFactory";
import { Handler, ProcessingData } from "../types";
import { GeneratedCodeMapCreator } from "../utils/GeneratedCodeMapCreator";

export class CodeGeneratorHandler implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: ProcessingData): void {
    if (!request.codeGenerators) {
      throw new Error("No code generators provided");
    }

    if (!request.endpointErrorCollections) {
      throw new Error("No endpoint error collections provided");
    }

    if (!request.generatedCodeMap) {
      request.generatedCodeMap = new Map();
    }

    const generatedCodeMapCreator = new GeneratedCodeMapCreator();

    request.codeGenerators.forEach((codeGenerator) => {
      request.endpointErrorCollections?.forEach((endpointErrorCollection) =>
        generatedCodeMapCreator.add(
          codeGenerator
            .setEndpointErrorCollection(endpointErrorCollection)
            .generateCode()
        )
      );
    });

    request.generatedCodeMap = generatedCodeMapCreator.getMap();

    this.next?.handle(request);
  }
}
