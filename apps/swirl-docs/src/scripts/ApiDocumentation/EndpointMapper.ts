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

    if (
      !FlipApiExtensions.getIgnoreRule(operation, "DD-01") &&
      requestBody?.[0]?.schema.type &&
      requestBody?.[0]?.schema.type !== "object"
    ) {
      throw new Error(
        `Request body schema type must be object, got ${
          requestBody[0]?.schema.type
        } for operation ${operation.getOperationId()}`
      );
    }

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
      const parameters: Array<OperationSchemaObject> = Object.entries(
        response.schema?.properties || {}
      ).map(([name, property]) => {
        const prop = property as SchemaObject;

        return this.toOperationSchemaObject(name, prop, response.schema);
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
      const type = parameter.type as OperationParamType;
      const label = parameter.label || "other";

      return {
        type,
        title: label,
        parameters: this.getEndpointTopLevelSchema(parameter.schema) ?? [],
      }
    });
  }

  private getEndpointTopLevelSchema(
    parent: SchemaObject
  ): OperationSchemaObject[] | undefined {
    if (parent.type !== "object") {
      return undefined;
    }

    if (!parent.properties) {
      return undefined;
    }

    return Object.entries(parent.properties).map(([name, child]) => {
      return this.toOperationSchemaObject(name, child, parent);
    });
  }

  private toOperationSchemaObject(name: string, prop: SchemaObject, parentObject?: SchemaObject): OperationSchemaObject {
    const hiddenProps = parentObject ?
      (FlipApiExtensions.getHiddenParams(parentObject) || [])
      : [];

    const requiredPropsInParent = this.determineRequiredProperties(parentObject);
    const childProperties = prop.properties || {};
    const hasRequiredFlag = typeof prop.required === "boolean" && prop.required;

    if (prop.type == "array") {
      // If the property is an array, we want to render the items only.
      return this.toOperationSchemaObject(name, prop.items as SchemaObject, prop);
    }

    return {
      name,
      array: parentObject?.type === "array", // Used to determine whether this property is rendered as part of an array.
      type: prop.type as OperationSchemaObject["type"],
      description: prop.description || "",
      required: hasRequiredFlag || requiredPropsInParent.includes(name) || false,
      properties: Object.entries(childProperties).map(([name, child]) => this.toOperationSchemaObject(name, child, prop)),
      hidden: hiddenProps.includes(name),
      enum: prop.enum as string[],
    };
  }

  private determineRequiredProperties(parentObject?: SchemaObject): string[] {
    if (!parentObject) {
      return [];
    }

    if (!Array.isArray(parentObject.required)) {
      return [];
    }

    return parentObject.required;
  }
}
