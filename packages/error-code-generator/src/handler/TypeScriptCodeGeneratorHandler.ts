import { Handler, Request } from "..";
import { ErrorCodeStringFactoryImpl } from "../ErrorCodeStringFactory";

export class TypeScriptCodeGeneratorHandler implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request): void {
    if (request.errorCodes) {
      for (const endpoint of request.errorCodes) {
        const stringFactory = new ErrorCodeStringFactoryImpl(endpoint);
        if (request.generatedCode) {
          request.generatedCode = [
            ...request.generatedCode,
            stringFactory.generate(),
          ];
        } else {
          request.generatedCode = [stringFactory.generate()];
        }
      }

      this.next?.handle(request);
    }
  }
}
