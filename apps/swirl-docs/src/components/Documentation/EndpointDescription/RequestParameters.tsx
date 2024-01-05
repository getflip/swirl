import { ApiEndpoint } from "@swirl/lib/docs";
import { Heading } from "src/components/swirl-recreations";
import { EndpointParameterFactory } from "./ParameterFactory";

export function RequestParameters({ endpoint }: { endpoint: ApiEndpoint }) {
  const sortedParameters = [
    ...(endpoint.parameters?.filter(
      (parameterType) => parameterType.type !== "body"
    ) || []),
    ...(endpoint.requestBody
      ?.filter((parameterType) => parameterType.type === "body")
      .map((body) => ({ ...body, title: "Request Body" })) || []),
  ];

  return (
    <>
      {sortedParameters.map((parameterType, index) => {
        const parameterFactory = new EndpointParameterFactory(
          parameterType.parameters
        );

        return (
          <div key={`${parameterType.title}-${index}`} className="mb-6">
            <Heading level={3} className="mb-2">
              {parameterType.title}
            </Heading>
            <div>{parameterFactory.renderProperties()}</div>
          </div>
        );
      })}
    </>
  );
}
