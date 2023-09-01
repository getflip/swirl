import { Endpoint } from "@swirl/lib/docs";
import OASBuilder from "@swirl/lib/docs/src/oasBuilderSetup";
import {
  createErrorAsConstObject,
  generateUserErrorsCode,
} from "ErrorCodeBuilder/StringFactory";
import OASNormalize from "oas-normalize";
import { HttpMethods } from "oas/dist/rmoas.types";
import path from "path";

const specpath = path.join("specs/users2.yml");

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: Request): void;
}

interface Request {
  folderPath: string; // Pfad zum Ordner, der die API-Specs enthält
  specpaths?: string[]; // Liste der gesammelten API-Specs
  errorCodes?: Array<Record<string, Endpoint["errorCodes"][]>>; // Liste der extrahierten Error Codes
  generatedCode?: Array<Record<string, string[]>>; // Liste der generierten TypeScript-Code-Schnipsel zu geordnet zu einem Endpunkt Typ
}

class ApiSpecLoader implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: Request): void {
    console.log("Handle");
  }
}

class ErrorCodeExtractor implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request): void {
    throw new Error("Method not implemented.");
  }
}

class TypeScriptCodeGenerator implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request): void {
    throw new Error("Method not implemented.");
  }
}

class FileWriter implements Handler {
  private next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request): void {
    throw new Error("Method not implemented.");
  }
}

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

// async function build() {
//   const oasDocument = await new (OASNormalize as any).default(specpath, {
//     enablePaths: true,
//   }).validate();

//   const oasBuilder = await new OASBuilder(oasDocument).dereference();

//   oasBuilder
//     .setTitleAndPath()
//     .setDescription()
//     .setEndpoints()
//     .setOperations()
//     .setTags();

//   let errorCodes: Array<Endpoint["errorCodes"]> = [];

//   for (const operation in oasBuilder.operations) {
//     const ops = oasBuilder.operations[operation as HttpMethods];

//     ops?.forEach((operation) => {
//       if (operation.errorCodes) {
//         errorCodes.push(operation.errorCodes);
//       }
//     });
//   }

//   if (errorCodes[0]) {
//     console.log(
//       createErrorAsConstObject(
//         errorCodes[0]["x-readme-ref-name"],
//         errorCodes[0]?.enum
//       )
//     );
//   }

//   if (errorCodes.length > 0) {
//     const errornames = errorCodes.map((error) => error["x-readme-ref-name"]);

//     console.log(generateUserErrorsCode("UserErrors", errornames));
//   }
// }

// build();
