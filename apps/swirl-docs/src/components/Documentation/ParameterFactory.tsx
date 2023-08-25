import { OperationSchemaObject } from "@swirl/lib/docs";
import { Parameter } from "./Parameter";
import { SchemaObject } from "oas/dist/rmoas.types";

interface ParameterRenderer {
  render(parameter: OperationSchemaObject): JSX.Element | JSX.Element[];
}

export class EndpointParameterFactory {
  private parameters: OperationSchemaObject[];

  private ParameterRenderers: {
    [key in OperationSchemaObject["type"]]: ParameterRenderer;
  } = {
    array: new ArrayParameterRenderer(),
    object: new ObjectParameterRenderer(),
    boolean: new PrimitiveParameterRenderer(),
    integer: new PrimitiveParameterRenderer(),
    number: new PrimitiveParameterRenderer(),
    string: new PrimitiveParameterRenderer(),
    null: new PrimitiveParameterRenderer(),
  };

  constructor(parameters: OperationSchemaObject[]) {
    this.parameters = parameters;
  }

  renderProperties() {
    return this.parameters.map((parameter) => {
      if (parameter.type) {
        return this.ParameterRenderers[parameter.type].render(parameter);
      }
      return this.ParameterRenderers.string.render(parameter);
    });
  }
}

class ObjectParameterRenderer implements ParameterRenderer {
  render(parameter: OperationSchemaObject) {
    return (
      <Parameter
        key={`parameter.name${parameter.name}`}
        name={parameter.name}
        type={parameter.type}
        description={parameter.description}
        required={parameter.required}
      >
        {parameter.properties
          ? new EndpointParameterFactory(
              parameter.properties
            ).renderProperties()
          : null}
      </Parameter>
    );
  }
}

class PrimitiveParameterRenderer implements ParameterRenderer {
  render(parameter: OperationSchemaObject) {
    return (
      <Parameter
        key={`parameter.name${parameter.name}`}
        name={parameter.name}
        type={parameter.type}
        description={parameter.description}
        required={parameter.required}
      />
    );
  }
}

class ArrayParameterRenderer implements ParameterRenderer {
  render(parameter: OperationSchemaObject) {
    if (parameter.items?.type === "object") {
      return (
        <Parameter
          key={`parameter.name${parameter.name}`}
          name={parameter.name}
          type={parameter.type}
          description={parameter.description}
          required={parameter.required}
        >
          {Object.keys(parameter.items?.properties).map((name) => {
            return (
              <Parameter
                key={`parameter.name${parameter.name}`}
                name={name}
                type={parameter.items?.properties[name].type}
                description={parameter.items?.properties[name].description}
                required={parameter.items?.required.includes(name)}
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
        required={parameter.required}
      >
        {parameter.items?.type === "string" && (
          <Parameter
            key={`string.${parameter.name}`}
            name={parameter.items.format ? parameter.items.format : "enum"}
            type={parameter.items?.type}
            description={
              parameter.items.enum ? parameter.items.enum.join(", ") : "null"
            }
          />
        )}
      </Parameter>
    );
  }
}

export class SchemaPropertiesRenderer {
  render(
    endpoint: any,
    properties:
      | {
          [name: string]: SchemaObject;
        }
      | undefined
  ) {
    return Object.entries(properties || {}).map(([name, property]) => {
      const type = String(
        (property as SchemaObject).type ||
          (property as SchemaObject).allOf
            ?.map((prop: any) => prop?.type)
            .filter((prop: any) => prop?.type)
            .join(" | ")
      );

      const enumValues = (property.allOf?.[0] as SchemaObject)
        ?.enum as string[];
      console.log("prop", name, property);
      return (
        <Parameter
          key={`request-body-property-${name}`}
          name={name}
          type={type}
          description={property.description}
          required={endpoint.required?.includes(name)}
          enumValues={enumValues}
        >
          {(property as any).items?.properties
            ? this.render(
                (property as any).items,
                (property as any).items.properties
              )
            : null}
        </Parameter>
      );
    });
  }
}
