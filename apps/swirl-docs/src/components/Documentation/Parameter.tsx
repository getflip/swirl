import { Tag } from "../Tags";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Text } from "../swirl-recreations";
import classNames from "classnames";

interface ParameterProps {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export function Parameter({
  name,
  type,
  description,
  required,
}: ParameterProps) {
  return (
    <div
      className={classNames(
        "flex flex-col",
        "border-border-1 border-border-default p-4",
        "first:rounded-t-border-radius-sm last:rounded-b-border-radius-sm",
        "border-b-0 last:border-border-1",
        "only:rounded-border-radius-sm only:border-border-1"
      )}
    >
      <div className="flex items-center mb-2 only:mb-0">
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
                {...props}
              />
            ),
          }}
          className="text-sm text-text-default"
        >
          {description}
        </ReactMarkdown>
      )}
    </div>
  );
}
