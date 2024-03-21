import { ApiEndpoint } from "@swirl/lib/docs";
import classNames from "classnames";
import { Heading } from "src/components/swirl-recreations";

export function GlobalErrorCodes({ endpoint }: { endpoint: ApiEndpoint }) {
  return endpoint.globalErrorCodes?.length ? (
    <div className="mb-6">
      <Heading level={3} className="mb-2">
        Error Codes
      </Heading>
      <ul>
        {endpoint.globalErrorCodes?.map((errorCode) => (
          <li
            key={errorCode}
            className={classNames(
              "font-font-family-code text-sm font-font-weight-bold",
              "border-border-1 border-border-default p-4",
              "first-of-type:rounded-t-border-radius-sm last-of-type:rounded-b-border-radius-sm",
              "border-b-0 last-of-type:border-border-1",
              "only:rounded-border-radius-sm only:border-border-1"
            )}
          >
            {errorCode}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
