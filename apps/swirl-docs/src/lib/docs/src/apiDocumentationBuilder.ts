import { MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  ApiDocumentation,
  ApiEndpoint,
  EndpointParam,
  EndpointParamType,
} from "./docs.model";
import OASBuilder from "./oasBuilder";
import { serializeMarkdownString } from "./utils";
import OASNormalize from "oas-normalize";
import { OpenAPIV3_1 } from "openapi-types/dist";
import { RequestBodyObject, SchemaObject } from "oas/dist/rmoas.types";

export class ApiDocumentationBuilder implements ApiDocumentation {
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

  async intialize() {
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

    this.description =
      (await serializeMarkdownString(this.oasBuilder.description)) || "";
    return this.build();
  }

  build() {
    this.title = this.oasBuilder.title;
    this.shortDescription = this.oasBuilder.shortDescription;
    this.getEndpoints();
    return this;
  }

  private getEndpointParamProperties(
    prop: SchemaObject
  ): EndpointParam[] | undefined {
    if (prop.type === "object") {
      if (prop.properties) {
        return Object.entries(prop.properties).map(([name, prop]) => {
          return {
            name,
            type: prop.type as EndpointParam["type"],
            description: prop.description || "",
            required: prop.required || false,
            properties: this.getEndpointParamProperties(prop),
          };
        });
      }
    }
    return undefined;
  }

  private getEndpoints() {
    this.endpoints = this.oasBuilder.endpoints.map((endpoint) => {
      const parameterTypes =
        endpoint.operation.getParametersAsJSONSchema() || [];
      const responseBodySchemas = Object.entries(
        endpoint.operation.schema.responses || {}
      ).map(([statusCode, response]) => ({
        schema: response.content?.["application/json"]?.schema || null,
        statusCode,
      }));
      const requestBodySchema =
        ((endpoint.operation.schema.requestBody as RequestBodyObject)
          ?.content?.["application/json"]
          ?.schema as OpenAPIV3_1.BaseSchemaObject) || null;
      return {
        title: endpoint.title,
        description: endpoint.operation.getDescription() || "",
        path: endpoint.path,
        isDeprecated: endpoint.operation.isDeprecated(),
        parameterTypes: parameterTypes.map((parameterType) => {
          const label = parameterType.label || "other";
          const type = parameterType.type as EndpointParamType;
          const requiredParams = parameterType.schema.required || [];
          const parametersObject = parameterType.schema.properties || {};
          if (
            typeof parametersObject === "object" &&
            Array.isArray(requiredParams)
          ) {
            const parameters: EndpointParam[] = Object.keys(
              parametersObject
            ).map((parameter) => {
              const prop = parametersObject[parameter] as SchemaObject;

              return {
                name: String(parameter),
                type: prop.type as EndpointParam["type"],
                description: prop.description || "",
                required: requiredParams.includes(parameter),
                properties: this.getEndpointParamProperties(prop),
              };
            });
            return { title: label, type, parameters: parameters };
          }
          return { title: label, type, parameters: [] };
        }),
        request: this.oasBuilder?.generateRequest(endpoint.operation),
        responseExamples: this.oasBuilder?.generateResponseExamples(
          endpoint.operation
        ),
        requestBodySchema,
        responseBodySchemas,
        security: endpoint.operation.api.security,
      };
    });
  }
}
