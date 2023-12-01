import { SchemaObject } from "oas/dist/rmoas.types";
import {
  Endpoint,
  ApiDocumentation,
  OperationSchemas,
  OperationSchemaObject,
  OperationParamType,
} from "./docs.model";
import OASBuilder from "./oasBuilder";

export class EndpointMapper {
  map(oasBuilder: OASBuilder): ApiDocumentation["endpoints"] {
    return oasBuilder.endpoints.map((endpoint) => {
      const responseBodySchemas = Object.entries(
        endpoint.operation.schema.responses || {}
      ).map(([statusCode, response]) => ({
        schema: response.content?.["application/json"]?.schema || null,
        statusCode,
      }));

      const isEndpointExperimental: ApiDocumentation["endpoints"][0]["isExperimental"] =
        (endpoint.operation.schema["x-experimental"] as boolean) ?? false;

      const requestSchemas = endpoint.operation.getParametersAsJSONSchema();
      return {
        title: endpoint.title,
        description: endpoint.operation.getDescription() || "",
        path: endpoint.path,
        isDeprecated: endpoint.operation.isDeprecated(),
        isExperimental: isEndpointExperimental,
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
        request: oasBuilder?.generateRequest(endpoint.operation),
        responseExamples: oasBuilder?.generateResponseExamples(
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
      const requiredProperties = response.schema?.required || [];
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
  private getEndpointParamArrayItems(
    prop: SchemaObject
  ): Array<any> | undefined {
    if (prop.type === "array" && prop.items) {
      return prop.items as Array<any>;
    }
    return undefined;
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
}
