import { OperationSchemaObject } from "@swirl/lib/docs";
import { Parameter } from "./Parameter";
import { OpenAPIV3_1 } from "openapi-types";

interface ParameterRenderer {
  render(
    parameter: OperationSchemaObject,
    schema?: OpenAPIV3_1.BaseSchemaObject
  ): JSX.Element | JSX.Element[];
}

export class EndpointParameterFactory {
  private parameters: OperationSchemaObject[];
  private schema?: OpenAPIV3_1.BaseSchemaObject;

  constructor(
    parameters: OperationSchemaObject[],
    schema?: OpenAPIV3_1.BaseSchemaObject
  ) {
    this.parameters = parameters;
    this.schema = schema;
  }

  getRenderer(type: string): ParameterRenderer {
    switch (type) {
      case "array":
        return new ArrayParameterRenderer();
      case "object":
        return new ObjectParameterRenderer();
      case "boolean":
      case "integer":
      case "number":
      case "string":
      case "null":
        return new PrimitiveParameterRenderer();
      default:
        return new PrimitiveParameterRenderer(); // Default renderer
    }
  }

  renderProperties() {
    return this.parameters.map((parameter) => {
      const renderer = this.getRenderer(parameter.type || "string");
      return renderer.render(parameter, this.schema);
    });
  }
}

class ObjectParameterRenderer implements ParameterRenderer {
  render(
    parameter: OperationSchemaObject,
    schema?: OpenAPIV3_1.BaseSchemaObject
  ) {
    return (
      <Parameter
        key={`parameter.name${parameter.name}`}
        name={parameter.name}
        type={parameter.type}
        description={parameter.description}
        required={
          parameter.required || schema?.required?.includes(parameter.name)
        }
      >
        {parameter.properties
          ? new EndpointParameterFactory(
              parameter.properties,
              schema?.properties?.[parameter.name]
            ).renderProperties()
          : null}
      </Parameter>
    );
  }
}

class PrimitiveParameterRenderer implements ParameterRenderer {
  render(
    parameter: OperationSchemaObject,
    schema?: OpenAPIV3_1.BaseSchemaObject
  ) {
    return (
      <Parameter
        key={`parameter.name${parameter.name}`}
        name={parameter.name}
        type={parameter.type}
        description={parameter.description}
        required={
          parameter.required || schema?.required?.includes(parameter.name)
        }
      />
    );
  }
}

class ArrayParameterRenderer implements ParameterRenderer {
  render(
    parameter: OperationSchemaObject,
    schema?: OpenAPIV3_1.BaseSchemaObject
  ) {
    if (parameter.items?.type === "object") {
      return (
        <Parameter
          key={`parameter.name${parameter.name}`}
          name={parameter.name}
          type={parameter.type}
          description={parameter.description}
          required={
            parameter.required || schema?.required?.includes(parameter.name)
          }
        >
          {Object.keys(parameter.items?.properties).map((name) => {
            const isRequired = parameter.items?.required
              ? parameter.items?.required.includes(name)
              : false;
            return (
              <Parameter
                key={`parameter.name${parameter.name}${name}`}
                name={name}
                type={parameter.items?.properties[name].type}
                description={parameter.items?.properties[name].description}
                required={isRequired}
              />
            );
          })}
        </Parameter>
      );
    }

    return (
      <Parameter
        key={`parameter.name${parameter.name}`}
        name={parameter.name}
        type={parameter.type}
        description={parameter.description}
        required={
          parameter.required || schema?.required?.includes(parameter.name)
        }
      >
        {parameter.items?.type === "string" && (
          <Parameter
            key={`string.${parameter.name}`}
            name={parameter.items.format ? parameter.items.format : "enum"}
            type={parameter.items?.type}
            enumValues={parameter.items.enum}
            description={
              parameter.items.enum ? parameter.items.enum.join(", ") : "null"
            }
          />
        )}
      </Parameter>
    );
  }
}
