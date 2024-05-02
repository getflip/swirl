import oasToHar from "@readme/oas-to-har";
import {
  oasToSnippet,
  supportedLanguages,
  SupportedTargets,
} from "@readme/oas-to-snippet";
import { sort } from "fast-sort";
import { Request } from "har-format";
import Oas, { Operation } from "oas";
import {
  HttpMethods,
  OASDocument,
  PathsObject,
  SchemaObject,
} from "oas/dist/rmoas.types";
import { CodePreviewSelectOptions } from "src/components/CodePreview/types";
import {
  ApiDocumentation,
  ApiEndpoint,
  Endpoint,
  Operations,
} from "../../lib/docs/src/docs.model";
import { EndpointMapper } from "./EndpointMapper";
import { FlipApiExtensions } from "./FlipApiExtensions";

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

const OAS = (Oas as any).default || Oas;
const OASToHar = (oasToHar as any).default || oasToHar;

export default class OASBuilder implements IOASBuilder {
  private _oasDocument: OASDocument = {} as OASDocument;
  private _oas: Oas = new OAS({} as OASDocument);
  private endpointMapper = new EndpointMapper();

  public title: string = "";
  public shortDescription: string = "";
  public path: string = "";
  public description: string = "";
  public paths: PathsObject = {};
  public operations: Operations = {};
  public endpoints: Endpoint[] = [];
  public detailedEndpoints: EndpointWithDetails[] = [];
  public tags: string[] = [];

  public apiDocumentations: Array<ApiDocumentation> = [];

  constructor(oasDocument: OASDocument) {
    this.initializeProperties(oasDocument);
  }

  private initializeProperties(oasDocument: OASDocument) {
    this._oasDocument = oasDocument;
    this._oas = new OAS(oasDocument);
  }

  private createParameters(
    parametersAsJsonSchema: ReturnType<
      Endpoint["operation"]["getParametersAsJSONSchema"]
    >
  ): EndpointWithDetails["parameters"] {
    return parametersAsJsonSchema.map((schemaWrapper) => {
      const requiredParams = schemaWrapper.schema.required || [];
      const allProperties = schemaWrapper.schema.properties || {};
      const paramLabel = schemaWrapper.label || "";

      if (typeof allProperties === "object" && Array.isArray(requiredParams)) {
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

  public setApiDocumentations() {
    const apiDocumentations: {
      [apiName: string]: {
        id: string;
        resources: {
          [resourceName: string]: {
            id: string;
            endpoints: { [endpointName: string]: ApiEndpoint };
          };
        };
      };
    } = {};

    Object.entries(this._oas.api.paths ?? {}).forEach(
      ([path, pathItemObject]) => {
        if (!pathItemObject) {
          return;
        }

        Object.keys(pathItemObject)
          .filter((method) => method !== "parameters")
          .forEach((pathItemObject) => {
            const operation = this._oas.operation(
              path,
              pathItemObject as HttpMethods
            );

            const isInternal = FlipApiExtensions.getInternal(operation);

            if (isInternal) {
              return;
            }

            const apiName = FlipApiExtensions.getApiName(operation);

            if (!apiName) {
              return;
            }

            const resourceName = FlipApiExtensions.getResourceName(operation);

            if (!resourceName) {
              return;
            }

            const endpoint = {
              ...this.endpointMapper.mapEndpoint(operation, this),
              method: pathItemObject as HttpMethods,
            };

            const endpoints = {
              ...(apiDocumentations[apiName]?.resources?.[resourceName]
                ?.endpoints || {}),
              [operation.getOperationId()]: endpoint,
            };

            const resources = {
              ...apiDocumentations[apiName]?.resources,
              [resourceName]: {
                id: resourceName,
                endpoints,
              },
            };

            apiDocumentations[apiName] = {
              id: apiName,
              resources,
            };
          });
      }
    );

    this.apiDocumentations = sort(
      Object.entries(apiDocumentations).map(([apiName, api]) => {
        return {
          id: api.id,
          title: this.getDisplayNameFromExtension(apiName),
          resources: sort(
            Object.entries(api.resources).map(([resourceName, resource]) => ({
              id: resource.id,
              title: this.getDisplayNameFromExtension(resourceName),
              shortDescription: "",
              endpoints: sort(Object.values(resource.endpoints)).asc([
                (endpoint) => endpoint.path,
                OASBuilder._getEndpointMethodOrder,
              ]),
            }))
          ).asc((a) => this.removePlural(a.title)),
        };
      })
    ).asc((a) => this.removePlural(a.title));

    return this;
  }

  private removePlural(words: string) {
    // remove plural from multiple words separated by spaces
    return words
      .split(" ")
      .map((word) => word.replace(/s$/, ""))
      .join(" ");
  }

  private getDisplayNameFromExtension(extension: string) {
    return extension
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
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
    if (Object.keys(this.paths).length === 0) {
      this.paths = this._oas.api.paths || {};
    }

    for (const path in this.paths) {
      const operationInPaths = this.paths[path];

      const methods = Object.keys(operationInPaths ?? {}).filter(
        (method) => method !== "parameters" && method !== "description"
      ) as HttpMethods[];

      methods.forEach((operation) => {
        const oasOperation = this._oas.operation(path, operation);
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

  public generateRequest(operation: Operation): {
    snippets: EndpointWithDetails["request"]["snippets"];
    request: EndpointWithDetails["request"]["request"];
  } {
    const har = OASToHar(this.oas, operation);
    const harRequest = har.log.entries[0].request;
    const body = operation.getRequestBodyExamples()[0]?.examples[0]?.value;
    const path = Object.fromEntries(
      Object.keys(
        operation.getParametersAsJSONSchema()?.find((t) => t.type === "path")
          ?.schema.properties || {}
      ).map((key) => [key, "(" + key + ")"]) // {} does not work as its encoded in the url
    );

    const allLanguages = Object.keys(supportedLanguages) as SupportedTargets[];
    const allLanguageSnippets = allLanguages.map((language) => [
      language,
      String(
        oasToSnippet(
          this.oas,
          operation,
          {
            body,
            path,
          },
          {},
          language
        ).code
      ),
    ]);

    return {
      snippets: Object.fromEntries(allLanguageSnippets) as Record<
        SupportedTargets,
        string
      >,
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
        const firstMediaTypeCode = Object.values(
          example.mediaTypes
        )[0] as Array<unknown>;

        if (firstMediaTypeCode) {
          acc[example.status] = JSON.stringify(
            // @ts-ignore
            firstMediaTypeCode[0].value,
            null,
            2
          );
        }

        return acc;
      },
      {}
    );

    return responseExamples;
  }

  private static _endpointMethodOrder: Record<string, number> = {
    GET: 1,
    POST: 2,
    PUT: 3,
    PATCH: 4,
    DELETE: 5,
    HEAD: 6,
    OPTIONS: 7,
    TRACE: 8,
  };

  private static _getEndpointMethodOrder = (endpoint: ApiEndpoint) => {
    return (
      OASBuilder._endpointMethodOrder[endpoint.method?.toUpperCase() || ""] ||
      Number.MAX_SAFE_INTEGER
    );
  };
}
