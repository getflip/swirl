import { ApiEndpoint } from "@swirl/lib/docs";
import { Heading } from "src/components/swirl-recreations";
import { Tag } from "src/components/Tags";

export function EndpointHeading({ endpoint }: { endpoint: ApiEndpoint }) {
  return (
    <Heading level={2} id={endpoint.id}>
      {endpoint.title}
      {endpoint.isDeprecated && (
        <span className="ml-2 inline-flex">
          <Tag content="deprecated" scheme="warning" />
        </span>
      )}
      {endpoint.isExperimental && (
        <span className="ml-2 inline-flex">
          <Tag content="experimental" scheme="warning" />
        </span>
      )}
      {endpoint.isInternal && (
        <span className="ml-2 inline-flex">
          <Tag content="internal" scheme="info" />
        </span>
      )}
    </Heading>
  );
}
