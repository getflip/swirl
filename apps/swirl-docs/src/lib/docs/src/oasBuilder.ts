import Oas, { Operation } from "oas";
import {
  HttpMethods,
  MediaTypeObject,
  OASDocument,
  PathsObject,
  SchemaObject,
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
  paths: PathsObject;
  operations: Operations;
  tags: string[];
}

type EndpointWithDetails = Endpoint & {
  description: string;
  isDeprecated: boolean;
  parameters: Array<{
    label: string;
    properties: Array<{
      type: string;
      name: string;
      description: string;
      required: boolean;
    }>;
    requiredProperties: SchemaObject["required"];
  }>;
  request: {
    code: string;
    request: Request;
  };
  response: string;
};

export default class OASBuilder implements IOASBuilder {
  private _oasDocument: OASDocument = {} as OASDocument;
  private _oas: Oas = new Oas({} as OASDocument);

  public title: string = "";
  public shortDescription: string = "";
  public path: string = "";
  public description: string = "";
  public paths: PathsObject = {};
  public operations: Operations = {};
  public endpoints: Endpoint[] = [];
  public detailedEndpoints: EndpointWithDetails[] = [];
  public tags: string[] = [];

  constructor(oasDocument: OASDocument) {
    this.initializeProperties(oasDocument);
  }

  private initializeProperties(oasDocument: OASDocument) {
    this._oasDocument = oasDocument;
    this._oas = new Oas(oasDocument);
  }

  public setDetailedEndpoints() {
    this.endpoints.forEach((apiEndpoint) => {
      const requestPreview = this.generateRequest(apiEndpoint.operation);
      const parameterSchemas =
        apiEndpoint.operation.getParametersAsJSONSchema() || [];

      const parameters: EndpointWithDetails["parameters"] =
        parameterSchemas.map((schemaWrapper) => {
          const requiredParams = schemaWrapper.schema.required || [];
          const allProperties = schemaWrapper.schema.properties || {};
          const paramLabel = schemaWrapper.label || "";

          if (
            typeof allProperties === "object" &&
            Array.isArray(requiredParams)
          ) {
            const propertyKeys = Object.keys(allProperties);
            const properties = propertyKeys.map((propertyKey) => {
              const isRequired = Boolean(requiredParams.includes(propertyKey));
              const property = allProperties[propertyKey] as SchemaObject;
              return {
                type: property.type as string,
                name: propertyKey,
                description: property.description || "",
                required: isRequired,
              };
            });

            return {
              label: paramLabel,
              properties: properties,
              requiredProperties: requiredParams,
            };
          }

          return {
            label: paramLabel,
            properties: [],
            requiredProperties: requiredParams,
          };
        });

      this.detailedEndpoints.push({
        ...apiEndpoint,
        description: apiEndpoint.operation.getDescription(),
        isDeprecated: apiEndpoint.operation.isDeprecated(),
        request: {
          ...requestPreview,
        },
        response: this.generateResponse(apiEndpoint.operation),
        parameters: parameters,
      });
    });
    return this;
  }

  public async dereference() {
    await this._oas.dereference().then(() => console.log("Dereferenced!"));
    return this;
  }

  public get oas() {
    return this._oas;
  }

  public get oasDocument() {
    return this._oasDocument;
  }

  public setDescription() {
    this.description = this._oas.api.info.description || "";
    return this;
  }

  public setEndpoints() {
    this.paths = this._oas.api.paths || {};
    return this;
  }

  public setTitleAndPath() {
    this.title = this._oas.api.info.title;
    this.shortDescription =
      this._oas.api.info.description?.split("# Changelog")[0] || "";
    this.path = this.title.toLowerCase().replaceAll(" ", "-");
    return this;
  }

  public setOperations() {
    if (Object.keys(this.paths).length === 0)
      throw new Error("Endpoints not set");

    for (const path in this.paths) {
      const operationInPaths = this.paths[path];
      const methods = Object.keys(operationInPaths ?? {}) as HttpMethods[];

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

    for (const operation in this.operations) {
      const endpoints = this.operations[operation as HttpMethods];

      endpoints?.forEach((endpoint) => {
        this.endpoints.push(endpoint);
      });
    }

    return this;
  }

  public setTags() {
    this.tags = this._oas.getTags();
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
