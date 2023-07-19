import Highlight, { Language, defaultProps } from "prism-react-renderer";
import { useCodePreviewContext } from "./CodePreviewContext";
import classNames from "classnames";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

export function CodePreviewHighlight() {
  const { isLightTheme, codeExample, isExpanded } = useCodePreviewContext();

  const lang = (
    codeExample.selectedId?.startsWith("2")
      ? "json"
      : codeExample.selectedId || "tsx"
  ) as Language;

  return (
    <Highlight
      {...defaultProps}
      theme={isLightTheme ? lightTheme : darkTheme}
      code={codeExample.code}
      language={lang}
    >
      {({ tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={classNames(
              "cursor-text overflow-hidden pt-space-16 md:pt-space-8 px-2 grow",
              {
                "pb-16": isExpanded,
                "pb-space-16": !isExpanded || isLightTheme,
                "md:pb-space-16": isLightTheme,
              }
            )}
          >
            <code className="text-font-size-sm">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={i} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        );
      }}
    </Highlight>
  );
}
