import Oas, { Operation } from "oas";
import OASNormalize from "oas-normalize";
import { HttpMethods, OASDocument, PathsObject } from "oas/dist/rmoas.types";
import { Operations } from "./docs.model";

interface IOASBuilder {
  title: string;
  path: string;
  description: string;
  endpoints: PathsObject;
  operations: Operations;
  tags: string[];
}

export default class OASBuilder implements IOASBuilder {
  private _oasDocument: OASDocument;
  private _oasBuilder: Oas = new Oas({} as OASDocument);

  public title: string = "";
  public shortDescription: string = "";
  public path: string = "";
  public description: string = "";
  public endpoints: PathsObject = {};
  public operations: Operations = {};
  public tags: string[] = [];

  constructor(oasDocument: OASDocument) {
    this._oasDocument = oasDocument;
    this._oasBuilder = new Oas(oasDocument);
    return this;
  }

  public get oas() {
    return this._oasBuilder;
  }

  public get oasDocument() {
    return this._oasDocument;
  }

  public setDescription() {
    this.description = this._oasBuilder.api.info.description as string;
    return this;
  }

  public setEndpoints() {
    this.endpoints = this._oasBuilder.api.paths as PathsObject;
    return this;
  }

  public setTitleAndPath() {
    this.title = this._oasBuilder.api.info.title;

    if (this._oasBuilder.api.info.description) {
      this.shortDescription =
        this._oasBuilder.api.info.description.split("# Changelog")[0];
    }

    this.path = this.title.toLowerCase().replaceAll(" ", "-");
    return this;
  }

  public setOperations() {
    if (Object.keys(this.endpoints).length === 0)
      throw new Error("Endpoints not set");
    for (const path in this.endpoints) {
      const operationInPaths = this.endpoints[path];
      const methods = Object.keys(operationInPaths!) as HttpMethods[];

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
    return this;
  }

  public setTags() {
    this.tags = this._oasBuilder.getTags();
    return this;
  }
}
