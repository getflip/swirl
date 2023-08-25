import { MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  ApiDocumentation,
  ApiEndpoint,
  Endpoint,
  OperationSchemaObject,
  OperationParamType,
  OperationSchemas,
} from "./docs.model";
import OASBuilder from "./oasBuilder";
import { serializeMarkdownString } from "./utils";
import OASNormalize from "oas-normalize";
import { SchemaObject } from "oas/dist/rmoas.types";

export class ApiDocumentationFacade implements ApiDocumentation {
  title: string = "";
  shortDescription: string = "";
  description: MDXRemoteSerializeResult =
    "" as unknown as MDXRemoteSerializeResult;
  endpoints: ApiEndpoint[] = [];

  private specPath: string;
  private oasBuilder: OASBuilder = {} as OASBuilder;

  constructor(specPath: string) {
    this.specPath = specPath;
  }

  async build() {
    const oasDocument = await new OASNormalize(this.specPath, {
      enablePaths: true,
    }).validate();
    this.oasBuilder = await new OASBuilder(oasDocument)
      .dereference()
      .then((oas) => {
        oas
          .setTitleAndPath()
          .setDescription()
          .setEndpoints()
          .setOperations()
          .setDetailedEndpoints();
        return oas;
      });

    this.title = this.oasBuilder.title;
    this.description =
      (await serializeMarkdownString(this.oasBuilder.description)) || "";
    this.shortDescription = this.oasBuilder.shortDescription;
    this.endpoints = this.getEndpoints();
    return this;
  }

  private getEndpoints(): ApiDocumentation["endpoints"] {
    return this.oasBuilder.endpoints.map((endpoint) => {
      const responseBodySchemas = Object.entries(
        endpoint.operation.schema.responses || {}
      ).map(([statusCode, response]) => ({
        schema: response.content?.["application/json"]?.schema || null,
        statusCode,
      }));

      const requestSchemas = endpoint.operation.getParametersAsJSONSchema();

      return {
        title: endpoint.title,
        description: endpoint.operation.getDescription() || "",
        path: endpoint.path,
        isDeprecated: endpoint.operation.isDeprecated(),
        parameters: requestSchemas
          ? this.getEndpointOperationSchema(
              requestSchemas.filter((param) => param.type !== "body")
            )
          : undefined,
        requestBody: requestSchemas
          ? this.getEndpointOperationSchema(
              requestSchemas.filter((param) => param.type === "body")
            )
          : undefined,
        responseBody: this.getEndpointOperationResponseParameters(endpoint),
        request: this.oasBuilder?.generateRequest(endpoint.operation),
        responseExamples: this.oasBuilder?.generateResponseExamples(
          endpoint.operation
        ),
        responseBodySchemas,
        security: endpoint.operation.api.security,
      };
    });
  }

  private getEndpointOperationResponseParameters(
    endpoint: Endpoint
  ): OperationSchemas {
    const responseBodySchemas = Object.entries(
      endpoint.operation.schema.responses || {}
    ).map(([statusCode, response]) => ({
      schema: response.content?.["application/json"]?.schema || null,
      statusCode,
    }));

    return responseBodySchemas.map((response) => {
      const requiredProperties = response.schema.required || [];
      const parameters: Array<OperationSchemaObject> = Object.entries(
        response.schema?.properties || {}
      ).map(([name, property]) => {
        const prop = property as SchemaObject;

        return {
          name: String(name),
          type: prop.type as OperationSchemaObject["type"],
          description: prop.description || "",
          required: requiredProperties.includes(name),
          properties: this.getEndpointOperationSchemaObject(prop),
          items: this.getEndpointParamArrayItems(prop),
        };
      });

      return {
        title: response.statusCode,
        parameters,
        type: "response",
      };
    });
  }

  private getEndpointOperationSchema(
    parameters: ReturnType<Endpoint["operation"]["getParametersAsJSONSchema"]>
  ): OperationSchemas {
    return parameters.map((parameter) => {
      const label = parameter.label || "other";
      const type = parameter.type as OperationParamType;
      const requiredParams = parameter.schema.required || [];
      const parametersObject = parameter.schema.properties || {};
      if (
        typeof parametersObject === "object" &&
        Array.isArray(requiredParams)
      ) {
        const parameters: Array<OperationSchemaObject> = Object.keys(
          parametersObject
        ).map((parameter) => {
          const prop = parametersObject[parameter] as SchemaObject;

          return {
            name: String(parameter),
            type: prop.type as OperationSchemaObject["type"],
            description: prop.description || "",
            required: requiredParams.includes(parameter),
            properties: this.getEndpointOperationSchemaObject(prop),
            items: this.getEndpointParamArrayItems(prop),
          };
        });
        return { title: label, type, parameters: parameters };
      }
      return { title: label, type, parameters: [] };
    });
  }

  private getEndpointOperationSchemaObject(
    prop: SchemaObject
  ): OperationSchemaObject[] | undefined {
    if (prop.type === "object") {
      if (prop.properties) {
        return Object.entries(prop.properties).map(([name, prop]) => {
          return {
            name,
            type: prop.type as OperationSchemaObject["type"],
            description: prop.description || "",
            required: prop.required || false,
            properties: this.getEndpointOperationSchemaObject(prop),
          };
        });
      }
    }
    return undefined;
  }

  private getEndpointParamArrayItems(
    prop: SchemaObject
  ): Array<any> | undefined {
    if (prop.type === "array" && prop.items) {
      return prop.items as Array<any>;
    }
    return undefined;
  }
}
