import Oas, { Operation } from "oas";
import {
  HttpMethods,
  MediaTypeObject,
  OASDocument,
  PathsObject,
} from "oas/dist/rmoas.types";
import oasToHar from "@readme/oas-to-har";
import { oasToSnippet } from "@readme/oas-to-snippet";
import { SupportedTargets } from "@readme/oas-to-snippet";
import { Request } from "har-format";
import { Endpoint, Operations } from "./docs.model";

interface IOASBuilder {
  title: string;
  path: string;
  description: string;
  endpoints: PathsObject;
  operations: Operations;
  tags: string[];
}

export default class OASBuilder implements IOASBuilder {
  private _oasDocument: OASDocument = {} as OASDocument;
  private _oasBuilder: Oas = new (Oas as any).default({} as OASDocument);

  public title: string = "";
  public shortDescription: string = "";
  public path: string = "";
  public description: string = "";
  public endpoints: PathsObject = {};
  public operations: Operations = {};
  public operationsList: Endpoint[] = [];
  public tags: string[] = [];

  constructor(oasDocument: OASDocument) {
    this.initializeProperties(oasDocument);
  }

  private initializeProperties(oasDocument: OASDocument) {
    this._oasDocument = oasDocument;
    this._oasBuilder = new (Oas as any).default(oasDocument);
  }

  public async dereference() {
    this._oasBuilder.dereference();
    return this;
  }

  public get oas() {
    return this._oasBuilder;
  }

  public get oasDocument() {
    return this._oasDocument;
  }

  public setDescription() {
    this.description = this._oasBuilder.api.info.description || "";
    return this;
  }

  public setEndpoints() {
    this.endpoints = this._oasBuilder.api.paths || {};
    return this;
  }

  public setTitleAndPath() {
    this.title = this._oasBuilder.api.info.title;
    this.shortDescription =
      this._oasBuilder.api.info.description?.split("# Changelog")[0] || "";
    this.path = this.title.toLowerCase().replaceAll(" ", "-");
    return this;
  }

  public setOperations() {
    if (Object.keys(this.endpoints).length === 0)
      throw new Error("Endpoints not set");

    for (const path in this.endpoints) {
      const operationInPaths = this.endpoints[path];
      const methods = Object.keys(operationInPaths ?? {}) as HttpMethods[];

      methods.forEach((operation) => {
        const oasOperation = this._oasBuilder.operation(path, operation);
        if (!this.operations[operation]) {
          this.operations[operation] = [];
        }
        this.operations[operation]?.push({
          title: oasOperation.getSummary(),
          path: `/${this.path}#${oasOperation
            .getSummary()
            .toLowerCase()
            .replaceAll(" ", "-")}`.replaceAll(".", ""),
          operation: oasOperation,
        });
      });
    }

    for (const operation in this.operations) {
      const endpoints = this.operations[operation as HttpMethods];

      endpoints?.forEach((endpoint) => {
        this.operationsList.push(endpoint);
      });
    }

    return this;
  }

  public setTags() {
    this.tags = this._oasBuilder.getTags();
    return this;
  }

  public generateRequest(
    operation: Operation,
    language?: SupportedTargets
  ): {
    code: string;
    request: Request;
  } {
    const har = oasToHar(this.oas, operation);
    const harRequest = har.log.entries[0].request;
    const { code } = oasToSnippet(this.oas, operation, {}, {}, "shell");

    return {
      code: code as string,
      request: {
        ...harRequest,
        url: operation.path,
      },
    };
  }

  public generateResponse(operation: Operation) {
    // currently we just take the first element as our OA specs are not fully functional. E.g. 201 is not defined for post for some requests.
    const responseExample = operation.getResponseExamples()[0].mediaTypes[
      "application/json"
    ] as Array<MediaTypeObject>;

    const valueOfResponse = responseExample as any;

    return JSON.stringify(
      responseExample
        ? valueOfResponse[0].value
        : "No Response Example was provided",
      null,
      2
    );
  }
}
