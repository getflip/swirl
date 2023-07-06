import { Tag } from "../Tags";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Text } from "../swirl-recreations";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { SwirlIconAdd, SwirlIconRemove } from "@getflip/swirl-components-react";

interface ParameterProps {
  children?: ReactNode;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export function Parameter({
  children,
  name,
  type,
  description,
  required,
}: ParameterProps) {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    setExpanded((expanded) => !expanded);
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
        <code className="text-sm font-font-weight-bold mr-2">{name}</code>
        <Tag content={type} />
        {required && <Tag content="required" scheme="critical" />}
      </div>
      {description && (
        <ReactMarkdown
          components={{
            p: (props) => <Text size="sm" {...props} />,
            code: (props) => (
              <code
                className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
                {...{ ...props, inline: "inline" }}
              />
            ),
          }}
          className="text-sm text-text-default mt-2"
        >
          {description}
        </ReactMarkdown>
      )}
      {children && (
        <div className="mt-space-8 empty:mt-0">
          <button
            className="inline-flex items-center gap-space-4 font-medium text-font-size-sm text-interactive-primary-default"
            onClick={toggle}
            type="button"
          >
            {!expanded && (
              <>
                <SwirlIconAdd size={20} /> Expand
              </>
            )}
            {expanded && (
              <>
                <SwirlIconRemove size={20} /> Collapse
              </>
            )}
          </button>
          {expanded && <div className="mt-space-16">{children}</div>}
        </div>
      )}
    </div>
  );
}
