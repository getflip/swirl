import Oas, { Operation } from "oas";
import OASNormalize from "oas-normalize";
import { HttpMethods, OASDocument, PathsObject } from "oas/dist/rmoas.types";

export type Endpoint = {
  title: string;
  path: string;
  operation: Operation;
};

export type Operations = {
  [K in HttpMethods]?: Endpoint[];
};

export default class OASBuilder {
  private _promisedOAS: Promise<OASDocument>;
  private _oas: Oas = new Oas({} as OASDocument);

  public title: string = "";
  public path: string = "";
  public description: string = "";
  public endpoints: PathsObject = {};
  public operations: Operations = {};
  public tags: string[] = [];

  constructor(specPath: string) {
    const oas = new OASNormalize(specPath, { enablePaths: true });
    this._promisedOAS = oas.validate() as Promise<OASDocument>;
    return this;
  }

  public get oas() {
    return this._oas;
  }

  public async parseOAS() {
    const definition = await this._promisedOAS;
    this._oas = new Oas(definition);
    return this;
  }

  public setDescription() {
    this.description = this._oas.api.info.description as string;
    return this;
  }

  public setPaths() {
    this.endpoints = this._oas.api.paths as PathsObject;
    return this;
  }

  public setTitleAndPath() {
    this.title = this._oas.api.info.title;
    this.path = this.title.toLowerCase().replaceAll(" ", "-");
    return this;
  }

  public setOperations() {
    for (const path in this.endpoints) {
      const operationInPaths = this.endpoints[path];
      const methods = Object.keys(operationInPaths!) as HttpMethods[];

      methods.forEach((operation) => {
        const oasOperation = this._oas.operation(path, operation);
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
    this.tags = this._oas.getTags();
    return this;
  }
}
