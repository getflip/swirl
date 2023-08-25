import { OperationSchemaObject } from "@swirl/lib/docs";
import { Parameter } from "./Parameter";

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
