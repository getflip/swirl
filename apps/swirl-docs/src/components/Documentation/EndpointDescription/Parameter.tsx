import classNames from "classnames";
import { ReactNode } from "react";
import { Tag } from "../../Tags";
import { DocumentationMarkdown } from "../DocumentationMarkdown";
import {
  getStatusText,
  HttpStatusCode,
  isValidStatusCode,
} from "../HttpStatusCodeMapper";
import { isProdDeployment } from "@swirl/lib/env";
import { Expandable } from "../Expandable";

interface ParameterProps {
  children?: ReactNode;
  name: string;
  type?: string;
  required?: boolean;
  hidden?: boolean;
  description?: string;
  enumValues?: string[];
  array?: boolean;
}

export function Parameter({
  children,
  name,
  type,
  description,
  required,
  hidden,
  enumValues,
  array,
}: ParameterProps) {
  if (isProdDeployment && hidden) {
    return null;
  }

  return (
    <div
      className={classNames(
        "flex flex-col",
        "border-border-1 border-border-default p-4",
        "first-of-type:rounded-t-border-radius-sm last-of-type:rounded-b-border-radius-sm",
        "border-b-0 last-of-type:border-border-1",
        "only:rounded-border-radius-sm only:border-border-1"
      )}
    >
      <div className="flex items-center">
        <code
          className={classNames("text-sm font-font-weight-bold mr-2", {
            "text-text-success": name.match(/^2\d\d$/),
            "text-text-warning": name.match(/^3\d\d$/),
            "text-text-critical":
              name.match(/^4\d\d$/) || name.match(/^5\d\d$/),
          })}
        >
          {name}{" "}
          {isValidStatusCode(name) &&
            `${getStatusText(Number(name) as HttpStatusCode)}`}
        </code>
        {type && <Tag content={type + (array ? "[]" : "")} />}
        {required && <Tag content="required" scheme="critical" />}
        {hidden && <Tag content="hidden for public" scheme="info" /> }
      </div>
      {description && (
        <DocumentationMarkdown className="text-sm text-text-default mt-2">
          {description}
        </DocumentationMarkdown>
      )}
      {enumValues?.length && (
        <Expandable>
          <div className="mt-space-8">
            <div
              className={classNames(
                "border-border-1 border-border-default p-4",
                "first-of-type:rounded-t-border-radius-sm last-of-type:rounded-b-border-radius-sm",
                "border-b-0 last-of-type:border-border-1",
                "only:rounded-border-radius-sm only:border-border-1"
              )}
            >
            <span className="font-font-weight-medium text-font-size-sm text-text-subdued">
              Possible enum values
            </span>
            </div>
            <div
              className={classNames(
                "flex flex-wrap gap-y-space-8",
                "border-border-1 border-border-default p-4",
                "first-of-type:rounded-t-border-radius-sm last-of-type:rounded-b-border-radius-sm",
                "border-b-0 last-of-type:border-border-1",
                "only:rounded-border-radius-sm only:border-border-1"
              )}
            >
              {enumValues.map((value) => (
                <Tag key={value} content={value} />
              ))}
            </div>
          </div>
        </Expandable>
      )}
      {children && <Expandable>{children}</Expandable>}
    </div>
  );
}
