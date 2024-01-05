import { ApiEndpoint } from "@swirl/lib/docs";
import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { LinkedHeading, Text } from "src/components/swirl-recreations";
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

      <ReactMarkdown
        className="text-base mb-6"
        components={{
          p: (props) => <Text {...props} size="sm" />,
          code: (props) => (
            <code
              className="max-w-full bg-gray-100 rounded-md p-[2px] text-sm font-font-family-code break-words"
              {...{ ...props, inline: "inline" }}
            />
          ),
        }}
      >
        {endpoint.description}
      </ReactMarkdown>
      <div className="mb-6">
        <RequestParameters endpoint={endpoint} />

        <ResponseBodySchemas endpoint={endpoint} />

        <GlobalErrorCodes endpoint={endpoint} />
      </div>
    </div>
  );
};
