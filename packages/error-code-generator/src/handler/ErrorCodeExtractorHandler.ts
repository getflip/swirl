import OASNormalize from "oas-normalize";
import { Handler, Request } from "..";
import OASBuilder, { Endpoint, Operations } from "../Oas.builder";

export type EndpointErrorCodes = {
  endpoint: string;
  errorCodes: Array<Required<Endpoint["errorCodes"]>>;
};

export class ErrorCodeExtractorHandler implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: Request): void {
    const dataPromises = request.specpaths?.map(async (specpath) => {
      const errorCodeBuilder = await new ErrorCodeBuilder(
        specpath
      ).initialize();

      return errorCodeBuilder.build();
    });

    Promise.all(dataPromises || []).then((data) => {
      request.errorCodes = data;

      this.next?.handle(request);
    });
  }
}

class ErrorCodeBuilder {
  private path: string;
  private oasBuilder: OASBuilder = {} as OASBuilder;
  private errorCodes: Array<Endpoint["errorCodes"]> = [];

  constructor(path: string) {
    this.path = path;
  }

  async initialize() {
    console.log("ErrorCodeExtractorHandler", this.path);

    const oasDocument = await new OASNormalize(this.path, {
      enablePaths: true,
      colorizeErrors: true,
    }).validate();

    console.log("ErrorCodeExtractorHandler", oasDocument);

    const oasBuilder = await new OASBuilder(oasDocument).dereference();

    this.oasBuilder = oasBuilder
      .setTitleAndPath()
      .setDescription()
      .setEndpoints()
      .setOperations()
      .setTags();

    return this;
  }

  public build(): EndpointErrorCodes {
    for (const operation in this.oasBuilder.operations) {
      const operations =
        this.oasBuilder.operations[operation as keyof Operations];

      operations?.forEach((operation) => {
        if (operation.errorCodes) {
          this.errorCodes.push(operation.errorCodes);
        }
      });
    }

    return {
      endpoint: this.oasBuilder.title.replaceAll(" ", ""),
      errorCodes: this.errorCodes,
    };
  }
}
