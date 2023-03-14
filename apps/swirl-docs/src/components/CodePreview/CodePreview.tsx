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
import theme from "prism-react-renderer/themes/vsDark";
import { CodeExample } from "./types";
import { NpmPackageLink } from "./NpmPackageLink";
import CodePreviewContext from "./CodePreviewContext";
import { Request } from "./CodePreviewRequestString";

interface CodePreviewProps {
  codeExample: CodeExample;
  children?: ReactNode | ReactNode[];
}

/**
 * Let's you easily render syntax highlighted code.
 * Children of the Component will be displayed in the Header.
 */
export function CodePreview({ children, codeExample }: CodePreviewProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <NoSsr>
      <CodePreviewContext.Provider value={codeExample}>
        <div
          className={classNames(
            "relative w-auto bg-[#24292E] rounded-lg mb-10 overflow-auto",
            {
              "md:h-[240px] md:max-h-[240px] overflow-hidden": !isExpanded,
              "min-h-[240px]": isExpanded,
            }
          )}
        >
          <div
            className={classNames(
              "hidden md:flex items-center justify-between h-12 m-2 p-4 rounded-lg",
              "bg-[#21201E]"
            )}
          >
            <div className="flex items-center justify-between">{children}</div>
            <CopyToClipboard
              text={codeExample.code}
              onCopy={() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}
            >
              <button className="flex justify-center items-center text-[#F2F2F2] text-base font-medium">
                {isCopied ? "copied!" : "copy"}
                {isCopied ? (
                  <SwirlIconCheckStrong size={16} className="ml-1" />
                ) : (
                  <SwirlIconCopy size={16} className="ml-1" />
                )}
              </button>
            </CopyToClipboard>
          </div>

          <Highlight
            {...defaultProps}
            theme={theme}
            code={codeExample.code}
            language={codeExample.language ? codeExample.language : "tsx"}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre
                className={classNames(
                  "cursor-text overflow-auto pt-space-16 md:pt-space-8 px-space-24 ",
                  "md:pb-16",
                  {
                    "pb-space-16": !isExpanded,
                    "pb-16": isExpanded,
                  }
                )}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={i} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>

          {codeExample.isLongCode && (
            <div className="absolute bottom-0 flex justify-center items-center w-full h-12  bg-[#24292E]">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bottom-2 left-auto right-auto flex justify-center items-center text-[#F2F2F2] text-base font-medium"
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
CodePreview.Request = Request;
