import { ApiEndpoint } from "@swirl/lib/docs";
import { FunctionComponent } from "react";
import { LinkedHeading } from "src/components/swirl-recreations";
import { DocumentationMarkdown } from "../DocumentationMarkdown";
import { EndpointHeading } from "./EndpointHeading";
import { EndpointSecurity } from "./EndpointSecurity";
import { GlobalErrorCodes } from "./GlobalErrorCodes";
import { RequestParameters } from "./RequestParameters";
import { ResponseBodySchemas } from "./ResponseBodySchemas";

interface EndpointDescription {
  endpoint: ApiEndpoint;
  endpointId?: string;
  path: string;
}

export const EndpointDescription: FunctionComponent<EndpointDescription> = ({
  endpoint,
  path,
}) => {
  return (
    <div className="max-w-full md:max-w-[37.5rem] overflow-x-auto">
      <LinkedHeading href={path}>
        <EndpointHeading endpoint={endpoint} />
      </LinkedHeading>

      <EndpointSecurity endpoint={endpoint} />

      <DocumentationMarkdown>{endpoint.description}</DocumentationMarkdown>

      <div className="mb-6">
        <RequestParameters endpoint={endpoint} />

        <ResponseBodySchemas endpoint={endpoint} />

        <GlobalErrorCodes endpoint={endpoint} />
      </div>
    </div>
  );
};
