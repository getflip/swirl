import { ErrorCodeBuilder } from "../builder/ErrorCode.builder";
import { Handler, ProcessingData } from "../types";

export class ErrorCodeExtractorHandler implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: ProcessingData): void {
    if (!request.sourcePath) {
      return;
    }

    const builder = this.createBuilder(request.sourcePath);
    builder.initialize().then(() => {
      request.endpointErrorCollections = builder.build();

      if (!this.next) {
        console.error(
          "No next handler. Stopping chain. Current processing object: ",
          request,
        );
        return;
      }

      this.next?.handle(request);
    });
  }

  protected createBuilder(specpath: string): ErrorCodeBuilder {
    return new ErrorCodeBuilder(specpath);
  }
}
