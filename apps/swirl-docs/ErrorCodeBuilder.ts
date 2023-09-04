import { Endpoint } from "@swirl/lib/docs";
import OASBuilder from "@swirl/lib/docs/src/oasBuilderSetup";
import {
  createErrorAsConstObject,
  generateUserErrorsCode,
} from "ErrorCodeBuilder/StringFactory";
import OASNormalize from "oas-normalize";
import { HttpMethods } from "oas/dist/rmoas.types";
import path from "path";
import fs from "fs";
import { ErrorCodeStringFactoryImpl } from "ErrorCodeStringFactory";

const specpath = path.join("specs/users2.yml");

/** IMPLEMENTATION */

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: Request): void;
}

export type EndpointErrorCodes = {
  endpoint: string;
  errorCodes: Array<Required<Endpoint["errorCodes"]>>;
};
interface Request {
  folderPath: string; // Pfad zum Ordner, der die API-Specs enthält
  specpaths?: string[]; // Liste der gesammelten API-Specs
  errorCodes?: Array<EndpointErrorCodes>; // Liste der extrahierten Error Codes
  generatedCode?: Array<ReturnType<ErrorCodeStringFactoryImpl["generate"]>>; // Liste der generierten TypeScript-Code-Schnipsel zu geordnet zu einem Endpunkt Typ
}

class ApiSpecLoader implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: Request): void {
    const { folderPath } = request;
    const specpaths = fs.readdirSync(folderPath).map((filename) => {
      return path.join(folderPath, filename);
    });

    request.specpaths = specpaths;

    if (this.next) {
      this.next.handle(request);
    }
  }
}

class ErrorCodeExtractor implements Handler {
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

class TypeScriptCodeGenerator implements Handler {
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

class FileWriter implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request): void {
    console.log(
      "arrived at the end of the chain",
      JSON.stringify(request, null, 2)
    );
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
    const oasDocument = await new (OASNormalize as any).default(this.path, {
      enablePaths: true,
    }).validate();

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
      const operations = this.oasBuilder.operations[operation as HttpMethods];

      operations?.forEach((operation) => {
        if (operation.errorCodes) {
          this.errorCodes.push(operation.errorCodes);
        }
      });
    }

    return {
      endpoint: this.oasBuilder.title,
      errorCodes: this.errorCodes,
    };
  }
}

//** RUNNING CODE */
const loadApiSpecs = new ApiSpecLoader();
const extractErrorCodes = new ErrorCodeExtractor();
const generateTypeScriptCode = new TypeScriptCodeGenerator();
const writeFiles = new FileWriter();

loadApiSpecs
  .setNext(extractErrorCodes)
  .setNext(generateTypeScriptCode)
  .setNext(writeFiles);

const request: Request = {
  folderPath: "specs",
};

loadApiSpecs.handle(request);
