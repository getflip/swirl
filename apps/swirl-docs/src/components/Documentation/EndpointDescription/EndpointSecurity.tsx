import { SwirlIconLock } from "@getflip/swirl-components-react";
import { ApiEndpoint } from "@swirl/lib/docs";

export function EndpointSecurity({ endpoint }: { endpoint: ApiEndpoint }) {
  return endpoint.security?.length ? (
    <div className="mb-space-16">
      <p className="mb-space-8 flex gap-space-4 text-font-size-sm font-font-weight-medium text-text-critical">
        <SwirlIconLock className="mt-[1px]" size={16} /> Requires authentication
        via {Object.keys(endpoint.security[0])[0]}.
      </p>
    </div>
  ) : null;
}
