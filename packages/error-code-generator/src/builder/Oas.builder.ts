import Oas from "oas";

import type {
  HttpMethods,
  OASDocument,
  PathsObject,
} from "oas/dist/rmoas.types";
import { Endpoint, TaggedEndpointsMap } from "../types";

interface IOASBuilder {
  title: string;
  path: string;
  description: string;
  paths: PathsObject;
  taggedEndpointsMap: TaggedEndpointsMap;
  tags: string[];
}

export default class OASBuilder implements IOASBuilder {
  private _oasDocument: OASDocument = {} as OASDocument;
  private _oasBuilder: Oas = new Oas({} as OASDocument);

  public title: string = "";
  public shortDescription: string = "";
  public path: string = "";
  public description: string = "";
  public paths: PathsObject = {};
  public taggedEndpointsMap: TaggedEndpointsMap = {};
  public tags: string[] = [];

  constructor(oasDocument: OASDocument) {
    this.initializeProperties(oasDocument);
  }

  private initializeProperties(oasDocument: OASDocument) {
    this._oasDocument = oasDocument;
    this._oasBuilder = new Oas(oasDocument);
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

  public setDescription() {
    this.description = this._oasBuilder.api.info.description || "";
    return this;
  }

  public setPaths() {
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
    if (Object.keys(this.paths).length === 0) throw new Error("Paths not set");

    for (const path in this.paths) {
      const operationInPaths = this.paths[path];

      const methods = Object.keys(operationInPaths ?? {}).filter(
        (method) => method !== "parameters",
      ) as HttpMethods[];

      methods.forEach((method) => {
        const oasOperation = this._oasBuilder.operation(path, method);

        if (typeof oasOperation.schema.tags?.[0] === "string") {
          const tag = oasOperation.schema.tags?.[0] as string;

          if (!this.taggedEndpointsMap[tag]) {
            this.taggedEndpointsMap[tag] = [];
          }

          this.taggedEndpointsMap[tag]?.push({
            title: oasOperation.getSummary(),
            operation: oasOperation,
            errorCodes: oasOperation.getExtension(
              "x-flip-error-codes",
            ) as Endpoint["errorCodes"],
          });
        }
      });
    }

    return this;
  }

  public setTags() {
    this.tags = this._oasBuilder.getTags();

    return this;
  }
}
