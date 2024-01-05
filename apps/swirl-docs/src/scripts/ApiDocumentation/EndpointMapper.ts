import { Operation } from "oas";
import { SchemaWrapper } from "oas/dist/operation/get-parameters-as-json-schema";
import { SchemaObject } from "oas/dist/rmoas.types";
import {
  ApiEndpoint,
  ApiResourceDocumentation,
  Endpoint,
  OperationParamType,
  OperationSchemaObject,
  OperationSchemas,
} from "../../lib/docs/src/docs.model";
import { FlipApiExtensions } from "./FlipApiExtensions";
import OASBuilder from "./oasBuilder";

export class EndpointMapper {
  mapEndpoint(operation: Operation, oasBuilder: OASBuilder): ApiEndpoint {
    const responseBodySchemas = Object.entries(
      operation.schema.responses || {}
    ).map(([statusCode, response]) => ({
      schema: response.content?.["application/json"]?.schema || null,
      statusCode,
    }));

    const isEndpointExperimental: ApiResourceDocumentation["endpoints"][0]["isExperimental"] =
      (operation.schema["x-experimental"] as boolean) ?? false;

    const requestSchemas: SchemaWrapper[] | undefined =
      operation.getParametersAsJSONSchema();
    const requestBody = requestSchemas?.filter(
      (param) => param.type === "body"
    );
    const otherParameters = requestSchemas?.filter(
      (param) => param.type !== "body"
    );

    // if (
    //   requestBody?.[0]?.schema.type &&
    //   requestBody?.[0]?.schema.type !== "object"
    // ) {
    //   throw new Error(
    //     `Request body schema type must be object, got ${
    //       requestBody[0]?.schema.type
    //     } for operation ${operation.getOperationId()}`
    //   );
    // }

    for (const schema of responseBodySchemas) {
      if (schema.schema?.type && schema.schema?.type !== "object") {
        throw new Error(
          `Response body schema type must be object, got ${
            schema.schema.type
          } for operation ${operation.getOperationId()} / Status ${
            schema.statusCode
          }`
        );
      }
    }

    return {
      id: operation.getOperationId(),
      title: operation.getSummary(),
      description: operation.getDescription() || "",
      path: operation.path,
      isDeprecated: operation.isDeprecated(),
      isExperimental: isEndpointExperimental,
      isInternal: FlipApiExtensions.getInternal(operation),
      globalErrorCodes: FlipApiExtensions.getErrorCodes(operation),
      parameters: this.getEndpointOperationSchema(otherParameters),
      requestBody: this.getEndpointOperationSchema(requestBody),
      responseBody: this.getEndpointOperationResponseParameters(operation),
      request: oasBuilder?.generateRequest(operation),
      responseExamples: oasBuilder?.generateResponseExamples(operation),
      responseBodySchemas,
      security: operation.api.security,
    };
  }

  private getEndpointOperationResponseParameters(
    operation: Operation
  ): OperationSchemas {
    const responseBodySchemas = Object.entries(
      operation.schema.responses || {}
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
    parameters?: ReturnType<Endpoint["operation"]["getParametersAsJSONSchema"]>
  ): OperationSchemas | undefined {
    return parameters?.map((parameter) => {
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
