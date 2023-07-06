import { Tag } from "../Tags";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Text } from "../swirl-recreations";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { SwirlIconAdd, SwirlIconRemove } from "@getflip/swirl-components-react";
import { AnimatePresence, motion } from "framer-motion";

interface ParameterProps {
  children?: ReactNode;
  name: string;
  type?: string;
  required?: boolean;
  description?: string;
  enumValues?: string[];
}

export function Parameter({
  children,
  name,
  type,
  description,
  required,
  enumValues,
}: ParameterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggle() {
    setIsExpanded((expanded) => !expanded);
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
          {name}
        </code>
        {type && <Tag content={type} />}
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
      {enumValues?.length && (
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
      )}
      {children && (
        <div className="mt-space-8 empty:mt-0">
          <button
            className="inline-flex items-center gap-space-4 font-medium text-font-size-sm text-interactive-primary-default"
            onClick={toggle}
            type="button"
          >
            {!isExpanded && (
              <>
                <SwirlIconAdd size={20} /> Expand
              </>
            )}
            {isExpanded && (
              <>
                <SwirlIconRemove size={20} /> Collapse
              </>
            )}
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                style={{ originY: 0, overflow: "hidden" }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
