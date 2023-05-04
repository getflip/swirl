import {
  SwirlIconCheckStrong,
  SwirlIconCopy,
  SwirlIconExpandLess,
  SwirlIconExpandMore,
} from "@getflip/swirl-components-react";
import { ReactNode, useState } from "react";
import { CodeSandboxButton } from "./CodeSandboxButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classNames from "classnames";
import NoSsr from "../Layout/NoSsr";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { CodeExample } from "./types";
import { NpmPackageLink } from "./NpmPackageLink";
import CodePreviewContext from "./CodePreviewContext";
import { APIEndpointHeader } from "./CodePreviewRequestString";

interface CodePreviewProps {
  codeExample: CodeExample;
  isHttpResponse?: boolean;
  children?: ReactNode | ReactNode[];
}

/**
 * Let's you easily render syntax highlighted code.
 * Children of the Component will be displayed in the Header.
 */
export function CodePreview({
  children,
  codeExample,
  isHttpResponse,
}: CodePreviewProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <NoSsr>
      <CodePreviewContext.Provider value={codeExample}>
        <div
          className={classNames(
            "relative w-auto  rounded-lg mb-10 overflow-auto",
            {
              "bg-[#24292E]": !isHttpResponse,
              "bg-surface-raised-default": isHttpResponse,
            },
            {
              "md:h-[240px] md:max-h-[240px] overflow-hidden":
                !isExpanded && !isHttpResponse,
              "min-h-[240px]": isExpanded,
              "h-full": isHttpResponse,
            }
          )}
        >
          <div
            className={classNames(
              "hidden md:flex items-center justify-between h-12 m-2 p-4 rounded-lg",
              {
                "bg-[#21201E]": !isHttpResponse,
                "bg-surface-overlay-default": isHttpResponse,
              }
            )}
          >
            <div className="flex items-center justify-between">{children}</div>
            {!isHttpResponse && (
              <CopyToClipboard
                text={codeExample.code}
                onCopy={() => {
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                }}
              >
                <button
                  aria-label="Copy code to clipboard"
                  type="button"
                  className="flex justify-center items-center text-[#F2F2F2] text-base font-medium"
                >
                  {isCopied ? "Code copied!" : "Copy Code"}
                  {isCopied ? (
                    <SwirlIconCheckStrong size={16} className="ml-1" />
                  ) : (
                    <SwirlIconCopy size={16} className="ml-1" />
                  )}
                </button>
              </CopyToClipboard>
            )}
          </div>

          <Highlight
            {...defaultProps}
            theme={isHttpResponse ? lightTheme : darkTheme}
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
                    "pb-space-16": !isExpanded || isHttpResponse,
                    "md:pb-space-16": isHttpResponse,
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

          {codeExample.isLongCode && !isHttpResponse && (
            <div
              className={classNames(
                "absolute bottom-0 flex justify-center items-center w-full h-12",
                {
                  "bg-[#24292E]": !isHttpResponse,
                  "bg-surface-raised-default": isHttpResponse,
                }
              )}
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={classNames(
                  "bottom-2 left-auto right-auto flex justify-center items-center text-[#F2F2F2] text-base font-medium",
                  {
                    "text-[#F2F2F2]": !isHttpResponse,
                    "text-[#24292E]": isHttpResponse,
                  }
                )}
              >
                {isExpanded ? "Collapse" : "Expand"}
                {isExpanded ? (
                  <SwirlIconExpandLess className="ml-2" size={24} />
                ) : (
                  <SwirlIconExpandMore className="ml-2" size={24} />
                )}
              </button>
            </div>
          )}
        </div>
      </CodePreviewContext.Provider>
    </NoSsr>
  );
}

CodePreview.CodeSandboxButton = CodeSandboxButton;
CodePreview.NpmPackageLink = NpmPackageLink;
CodePreview.Request = APIEndpointHeader;
