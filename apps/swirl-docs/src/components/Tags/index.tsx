import classNames from "classnames";
import { FunctionComponent } from "react";

export interface TagProps {
  content: string;
  scheme?: "critical" | "info" | "success" | "warning" | "default";
}

export function mapHttpMethodToTagScheme(
  httpMethod: string
): TagProps["scheme"] {
  switch (httpMethod.toUpperCase()) {
    case "GET":
      return "info";
    case "POST":
      return "success";
    case "PUT":
      return "warning";
    case "DELETE":
      return "critical";
    default:
      return "default";
  }
}

export const Tag: FunctionComponent<TagProps> = ({ content, scheme }) => {
  return (
    <span
      className={classNames(
        "text-text-default px-2 py-1 rounded-md font-medium text-sm mr-2",
        {
          "bg-surface-neutral-subdued text-text-default":
            scheme === "default" || !scheme,
          "bg-surface-critical-subdued text-text-critical":
            scheme === "critical",
          "bg-surface-info-subdued text-text-info": scheme === "info",
          "bg-surface-success-subdued text-text-success": scheme === "success",
          "bg-surface-warning-subdued text-text-warning": scheme === "warning",
        }
      )}
    >
      {content}
    </span>
  );
};