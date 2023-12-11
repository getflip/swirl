import Oas from "oas";
import { HttpMethods, OASDocument, PathsObject } from "oas/dist/rmoas.types";
import { ApiDocumentation, Endpoint, Operations } from "./docs.model";

interface IOASBuilder {
  title: string;
  path: string;
  description: string;
  paths: PathsObject;
  operations: Operations;
  tags: string[];
}

/**
 * This Class is a duplicate of the OASBuilder class.
 * It is needed as we have to initilize the Oas lib differently to run this in a Node Script.
 *
 * As this is a duplicate, we have to keep it in sync with the OASBuilder class, when API changes are made.
 */
export default class OASBuilder implements IOASBuilder {
  private static X_FLIP_API_NAME = "x-flip-api-name";
  private _oasDocument: OASDocument = {} as OASDocument;
  private _oasBuilder: Oas = new (Oas as any).default({} as OASDocument);

  public title: string = "";
  public shortDescription: string = "";
  public path: string = "";
  public description: string = "";
  public paths: PathsObject = {};
  public operations: Operations = {};
  public operationsList: Endpoint[] = [];
  public tags: string[] = [];

  public apiDocumentations: Array<ApiDocumentation> = [];

  constructor(oasDocument: OASDocument) {
    this.initializeProperties(oasDocument);
  }

  private initializeProperties(oasDocument: OASDocument) {
    this._oasDocument = oasDocument;
    this._oasBuilder = new (Oas as any).default(oasDocument);
  }

  public async dereference() {
    await this._oasBuilder.dereference();
    return this;
  }

  public get oas() {
    return this._oasBuilder;
  }

  public get oasDocument() {
    return this._oasDocument;
  }

  public setApiDocumentations() {
    const apiNames = Array.from(
      new Set(
        Object.entries(this._oasBuilder.api.paths ?? {}).map(
          ([path, operation]) => {
            if (!operation) {
              return;
            }

            const oasOperation = this._oasBuilder.operation(
              path,
              operation as unknown as HttpMethods
            );

            return oasOperation.getExtension(OASBuilder.X_FLIP_API_NAME);
          }
        )
      )
    ).filter(Boolean);

    this.apiDocumentations = apiNames.map((apiName) => {
      return {
        title: apiName as string,
        resources: [],
      };
    });

    return this;
  }

  public setDescription() {
    this.description = this._oasBuilder.api.info.description || "";
    return this;
  }

  public setEndpoints() {
    this.paths = this._oasBuilder.api.paths || {};
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
    if (Object.keys(this.paths).length === 0) {
      this.paths = this._oasBuilder.api.paths || {};
    }

    for (const path in this.paths) {
      const operationInPaths = this.paths[path];

      const operations = Object.keys(operationInPaths ?? {}).filter(
        (operation) => operation !== "parameters" && operation !== "description"
      ) as HttpMethods[];

      operations.forEach((operation) => {
        const oasOperation = this._oasBuilder.operation(path, operation);
        if (!this.operations[operation]) {
          this.operations[operation] = [];
        }

        this.operations[operation]?.push({
          title:
            oasOperation.getSummary() ||
            oasOperation
              .getOperationId()
              .replaceAll("-", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize first letter of each word
          path: `/${this.path}#${oasOperation.getOperationId()}`.replaceAll(
            ".",
            ""
          ),
          operation: oasOperation,
          errorCodes: oasOperation.getExtension(
            "x-flip-error-codes"
          ) as Endpoint["errorCodes"],
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
}
