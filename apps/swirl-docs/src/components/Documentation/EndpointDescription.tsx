import { FunctionComponent } from "react";
import { Heading, LinkedHeading, Text } from "src/components/swirl-recreations";
import ReactMarkdown from "react-markdown";
import { SchemaObject } from "oas/dist/rmoas.types";
import { Parameter } from "./Parameter";
import { ApiEndpoint, EndpointParam } from "@swirl/lib/docs";
import { SwirlIconLock } from "@getflip/swirl-components-react";
import { Tag } from "../Tags";

interface EndpointDescription {
  endpoint: ApiEndpoint;
  endpointId: string;
  path: string;
}

export const EndpointDescription: FunctionComponent<EndpointDescription> = ({
  endpoint,
  endpointId,
  path,
}) => {
  return (
    <div className="max-w-[37.5rem]">
      <LinkedHeading href={path}>
        <Heading level={3} id={endpointId}>
          {endpoint.title}
          {endpoint.isDeprecated && (
            <span className="ml-2 inline-flex">
              <Tag content="deprecated" scheme="warning" />
            </span>
          )}
        </Heading>
      </LinkedHeading>
      {endpoint.security?.length && (
        <div className="mb-space-16">
          <p className="mb-space-8 flex gap-space-4 text-font-size-sm font-font-weight-medium text-text-critical">
            <SwirlIconLock className="mt-[1px]" size={16} /> Requires
            authentication via {Object.keys(endpoint.security[0])[0]}.
          </p>
        </div>
      )}
      <ReactMarkdown
        className="text-base mb-6"
        components={{
          p: (props) => <Text {...props} size="sm" />,
          code: (props) => (
            <code
              className="bg-gray-100 rounded-md p-[2px] text-sm font-font-family-code"
              {...{ ...props, inline: "inline" }}
            />
          ),
        }}
      >
        {endpoint.description}
      </ReactMarkdown>
      <div className="mb-6">
        {endpoint.parameterTypes?.map((parameterType, index) => {
          return (
            <div key={`${parameterType.title}-${index}`} className="mb-6">
              <Heading level={4} className="mb-2">
                {parameterType.title}
              </Heading>
              <div>
                {renderNestedEndpointProperties(parameterType.parameters)}
              </div>
            </div>
          );
        })}

        {endpoint.requestBodySchema && (
          <div className="mb-6">
            <Heading level={4} className="mb-2">
              Request Body
            </Heading>
            <div>
              {renderNestedSchemaProperties(
                endpoint,
                endpoint.requestBodySchema?.properties
              )}
            </div>
          </div>
        )}

        {endpoint.responseBodySchemas.length && (
          <div className="mb-6">
            <Heading level={4} className="mb-2">
              Response Body
            </Heading>
            <div>
              {endpoint.responseBodySchemas.map((responseBodySchema) => {
                return (
                  <Parameter
                    key={responseBodySchema.statusCode}
                    name={responseBodySchema.statusCode}
                  >
                    {responseBodySchema.schema?.properties
                      ? renderNestedSchemaProperties(
                          responseBodySchema.schema,
                          responseBodySchema.schema.properties
                        )
                      : null}
                  </Parameter>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function renderNestedEndpointProperties(parameters: EndpointParam[]) {
  return parameters.map((parameter) => {
    return (
      <Parameter
        key={`parameter.name${parameter.name}`}
        name={parameter.name}
        type={parameter.type}
        description={parameter.description}
        required={parameter.required}
      >
        {parameter.properties
          ? renderNestedEndpointProperties(parameter.properties)
          : null}
      </Parameter>
    );
  });
}

function renderNestedSchemaProperties(
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

    const enumValues = (property.allOf?.[0] as SchemaObject)?.enum as string[];

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
          ? renderNestedSchemaProperties(
              (property as any).items,
              (property as any).items.properties
            )
          : null}
      </Parameter>
    );
  });
}
