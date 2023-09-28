import { FileLoaderHandler } from "./handler/FileLoaderHandler";
import { ErrorCodeExtractorHandler } from "./handler/ErrorCodeExtractorHandler";
import { FileWriterHandler } from "./handler/FileWriterHandler";
import { TypeScriptCodeGeneratorHandler } from "./handler/TypeScriptCodeGeneratorHandler";

import path from "path";
import { EndpointErrorCodes } from "./handler/ErrorCodeExtractorHandler";
import { ErrorCodeStringFactoryImpl } from "./ErrorCodeStringFactory";

const specpath = path.join("apps/swirl-docs/specs/users2.yml");

/** IMPLEMENTATION */

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: Request): void;
}

export interface Request {
  folderPath: string; // Pfad zum Ordner, der die API-Specs enthält
  specpaths?: string[]; // Liste der gesammelten API-Specs
  errorCodes?: Array<EndpointErrorCodes>; // Liste der extrahierten Error Codes
  generatedCode?: Array<ReturnType<ErrorCodeStringFactoryImpl["generate"]>>; // Liste der generierten TypeScript-Code-Schnipsel zu geordnet zu einem Endpunkt Typ
}

//** RUNNING CODE */
const loadApiSpecs = new FileLoaderHandler();
const extractErrorCodes = new ErrorCodeExtractorHandler();
const generateTypeScriptCode = new TypeScriptCodeGeneratorHandler();
const writeFiles = new FileWriterHandler();

loadApiSpecs
  .setNext(extractErrorCodes)
  .setNext(generateTypeScriptCode)
  .setNext(writeFiles);

const request: Request = {
  folderPath:
    "/Users/adam/Documents/dev/flip-corp/swirl/apps/swirl-docs/specs/merged.yml",
};

loadApiSpecs.handle(request);
