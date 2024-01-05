import ReactMarkdown from "react-markdown";

export function DocumentationMarkdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <ReactMarkdown
      components={{
        code: (props) => (
          <code className="bg-gray-100 rounded-md p-[2px] text-sm font-font-family-code">
            {props.children}
          </code>
        ),
        ul: (props) => (
          <ul
            className="mb-8 last:mb-0 leading-line-height-xl list-disc"
            {...props}
          />
        ),
        ol: (props) => (
          <ol
            className="mb-8 last:mb-0 leading-line-height-xl list-decimal"
            {...props}
          />
        ),
        li: (props) => <li className="ml-4" {...props} />,
      }}
      className={className}
    >
      {children}
    </ReactMarkdown>
  );
}
