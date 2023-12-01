import Highlight, { Language, defaultProps } from "prism-react-renderer";

import classNames from "classnames";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { useCodePreviewContext } from "./CodePreviewContext";

export function CodePreviewHighlight() {
  const { isLightTheme, codeExample, isExpanded, disableHeader } =
    useCodePreviewContext();

  const determineLanguage = (): Language => {
    if (codeExample.selectedId?.startsWith("2")) {
      return "json";
    }
    return (codeExample.selectedId || "tsx") as Language;
  };

  const isLastLineAndEmpty = (
    line: any[],
    index: number,
    allTokens: any[][]
  ) => {
    return (
      allTokens.length - 1 === index &&
      line.length === 1 &&
      line[0].content === "\n"
    );
  };

  return (
    <Highlight
      {...defaultProps}
      theme={isLightTheme ? lightTheme : darkTheme}
      code={codeExample.code}
      language={determineLanguage()}
    >
      {({ tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={classNames(
              "cursor-text overflow-x-auto pt-space-16 md:pt-space-8 px-2 grow",
              {
                "pb-16": isExpanded,
                "pb-space-16": !isExpanded || isLightTheme,
                "md:pb-space-16": isLightTheme,
                "pb-pb-space-8 md:pb-space-8": disableHeader,
              }
            )}
          >
            <code className="text-font-size-sm">
              {tokens.map((line, i) => {
                if (isLastLineAndEmpty(line, i, tokens)) {
                  return null;
                }

                return (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={i} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </code>
          </pre>
        );
      }}
    </Highlight>
  );
}
