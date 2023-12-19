import classNames from "classnames";

export interface TagProps {
  content: string;
  scheme?: "critical" | "info" | "success" | "warning" | "default";
  httpTag?: boolean;
}

export function mapHttpMethodToTagContent(
  httpMethod: string
): TagProps["content"] {
  return httpMethod.toUpperCase();
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

export function Tag({ content, scheme, httpTag }: TagProps) {
  return (
    <span
      className={classNames(
        "px-2 py-[4px] rounded-md text-xs mr-2 align-middle leading-3",
        {
          "bg-surface-neutral-subdued text-text-default":
            scheme === "default" || !scheme,
          "bg-surface-critical-subdued text-text-critical":
            scheme === "critical",
          "bg-surface-info-subdued text-text-info": scheme === "info",
          "bg-surface-success-subdued text-text-success": scheme === "success",
          "bg-surface-warning-subdued text-text-warning": scheme === "warning",
        },
        {
          "flex items-center justify-center min-w-[3.5rem] px-0": httpTag,
        }
      )}
    >
      {content}
    </span>
  );
}
