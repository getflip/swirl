import { ApiEndpoint } from "@swirl/lib/docs";
import { Heading } from "src/components/swirl-recreations";
import { Parameter } from "./Parameter";
import { EndpointParameterFactory } from "./ParameterFactory";

export function ResponseBodySchemas({ endpoint }: { endpoint: ApiEndpoint }) {
  return endpoint.responseBodySchemas.length ? (
    <div className="mb-6">
      <Heading level={3} className="mb-2">
        Response Body
      </Heading>
      <div>
        {endpoint.responseBody?.map((parameterType) => {
          const schema = endpoint.responseBodySchemas.find(
            (schema) => schema.statusCode === parameterType.title
          )?.schema;

          return (
            <Parameter key={parameterType.title} name={parameterType.title}>
              {new EndpointParameterFactory(
                parameterType.parameters,
                schema
              ).renderProperties()}
            </Parameter>
          );
        })}
      </div>
    </div>
  ) : null;
}
