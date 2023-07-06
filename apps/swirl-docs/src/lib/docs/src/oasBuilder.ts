import Oas, { Operation } from "oas";
import {
  HttpMethods,
  OASDocument,
  PathsObject,
  SchemaObject,
} from "oas/dist/rmoas.types";
import oasToHar from "@readme/oas-to-har";
import { oasToSnippet } from "@readme/oas-to-snippet";
import { SupportedTargets } from "@readme/oas-to-snippet";
import { Request } from "har-format";
import { Endpoint, Operations } from "./docs.model";
import { ResponseExamples } from "oas/dist/operation/get-response-examples";
import { CodePreviewSelectOptions } from "src/components/CodePreview/types";

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
    snippets: Record<SupportedTargets, string>;
    request: Request;
  };
  responseExamples: CodePreviewSelectOptions;
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
        responseExamples: this.generateResponseExamples(apiEndpoint.operation),
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

      const methods = Object.keys(operationInPaths ?? {}).filter(
        (method) => method !== "parameters"
      ) as HttpMethods[];

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
    snippets: EndpointWithDetails["request"]["snippets"];
    request: EndpointWithDetails["request"]["request"];
  } {
    const har = oasToHar(this.oas, operation);
    const harRequest = har.log.entries[0].request;

    return {
      snippets: {
        ocaml: String(oasToSnippet(this.oas, operation, {}, {}, "ocaml").code),
        c: String(oasToSnippet(this.oas, operation, {}, {}, "c").code),
        csharp: String(
          oasToSnippet(this.oas, operation, {}, {}, "csharp").code
        ),
        go: String(oasToSnippet(this.oas, operation, {}, {}, "go").code),
        java: String(oasToSnippet(this.oas, operation, {}, {}, "java").code),
        javascript: String(
          oasToSnippet(this.oas, operation, {}, {}, "javascript").code
        ),
        kotlin: String(
          oasToSnippet(this.oas, operation, {}, {}, "kotlin").code
        ),
        node: String(oasToSnippet(this.oas, operation, {}, {}, "node").code),
        php: String(oasToSnippet(this.oas, operation, {}, {}, "php").code),
        python: String(
          oasToSnippet(this.oas, operation, {}, {}, "python").code
        ),
        ruby: String(oasToSnippet(this.oas, operation, {}, {}, "ruby").code),
        shell: String(oasToSnippet(this.oas, operation, {}, {}, "shell").code),
        swift: String(oasToSnippet(this.oas, operation, {}, {}, "swift").code),
        http: String(oasToSnippet(this.oas, operation, {}, {}, "http").code),
        clojure: String(
          oasToSnippet(this.oas, operation, {}, {}, "clojure").code
        ),
        cplusplus: String(
          oasToSnippet(this.oas, operation, {}, {}, "cplusplus").code
        ),
        objectivec: String(
          oasToSnippet(this.oas, operation, {}, {}, "objectivec").code
        ),
        powershell: String(
          oasToSnippet(this.oas, operation, {}, {}, "powershell").code
        ),
        r: String(oasToSnippet(this.oas, operation, {}, {}, "r").code),
      },
      request: {
        ...harRequest,
        url: operation.path,
      },
    };
  }

  public generateResponseExamples(operation: Operation) {
    const responseExamplesList = operation.getResponseExamples();
    const responseExamples = responseExamplesList.reduce(
      (acc: CodePreviewSelectOptions, example) => {
        // Assuming each MediaTypeObject has a 'code' property
        const firstMediaTypeCode = Object.values(
          example.mediaTypes
        )[0] as Array<unknown>;

        // Only add the status if there is a corresponding code
        if (firstMediaTypeCode) {
          acc[example.status] = JSON.stringify(firstMediaTypeCode[0], null, 2);
        }

        return acc;
      },
      {}
    );

    return responseExamples;
  }
}
