import { hasIndexFileRendering } from "../factories/CodeGeneratorFactory";
import { EndpointErrorCollection, Handler, ProcessingData } from "../types";
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
      if (hasIndexFileRendering(codeGenerator)) {
        request.endpointErrorCollections?.forEach((endpointErrorCollection) => {
          generatedCodeMapCreator.add(
            codeGenerator
              .setEndpointErrorCollection(endpointErrorCollection)
              .generateCode(),
          );
        });

        generatedCodeMapCreator.add(codeGenerator.generateIndexCode());

        return;
      }

      if (!hasIndexFileRendering(codeGenerator)) {
        const cummulatedErrorCollection: EndpointErrorCollection = {
          endpoint: "error_codes",
          errorCodes: [],
        };

        request.endpointErrorCollections?.forEach((endpointErrorCollection) => {
          endpointErrorCollection.errorCodes;

          if (endpointErrorCollection.errorCodes) {
            cummulatedErrorCollection.errorCodes?.push(
              ...endpointErrorCollection.errorCodes,
            );
          }
        });

        codeGenerator.setEndpointErrorCollection(cummulatedErrorCollection);

        generatedCodeMapCreator.add(
          codeGenerator
            .setEndpointErrorCollection(cummulatedErrorCollection)
            .generateCode(),
        );
        return;
      }
    });

    request.generatedCodeMap = generatedCodeMapCreator.getMap();

    if (!this.next) {
      console.error(
        "No next handler. Stopping chain. Current processing object: ",
        request,
      );
      return;
    }

    this.next?.handle(request);
  }
}
