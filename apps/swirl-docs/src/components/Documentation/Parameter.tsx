import { Operation } from "oas";
import { Tag } from "../Tags";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
    <div className="flex flex-col py-4 border-b-1">
      <div className="flex items-center mb-2">
        <code className="text-sm font-font-weight-bold mr-2">{name}</code>
        <Tag content={type} />
        {required && <Tag content="required" scheme="critical" />}
      </div>
      {description && (
        <ReactMarkdown
          components={{
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
