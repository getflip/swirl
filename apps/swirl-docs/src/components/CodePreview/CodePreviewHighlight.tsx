import Highlight, { defaultProps } from "prism-react-renderer";
import { useCodePreviewContext } from "./CodePreviewContext";
import classNames from "classnames";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

export function CodePreviewHighlight() {
  const { isLightTheme, codeExample, isExpanded } = useCodePreviewContext();
  return (
    <Highlight
      {...defaultProps}
      theme={isLightTheme ? lightTheme : darkTheme}
      code={codeExample.code}
      language={codeExample.language ? codeExample.language : "tsx"}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre
          className={classNames(
            "cursor-text overflow-auto pt-space-16 md:pt-space-8 px-space-24 ",
            "md:pb-16",
            {
              "pb-16": isExpanded,
              "pb-space-16": !isExpanded || isLightTheme,
              "md:pb-space-16": isLightTheme,
            }
          )}
        >
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={i} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
