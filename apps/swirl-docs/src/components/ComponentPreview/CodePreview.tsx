import {
  FlipIconCheckStrong,
  FlipIconCopy,
  FlipIconExpandLess,
  FlipIconExpandMore,
  FlipIconOpenInNew,
} from "@getflip/swirl-components-react";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { CodeSandboxButton } from "./CodeSandboxButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classNames from "classnames";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";

import dark from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark";
import NoSsr from "../Layout/NoSsr";

export type CodeExample = {
  code: string;
  isLongCode: boolean;
};

interface CodePreviewProps {
  codeExample: CodeExample;
}

export const CodePreview: FunctionComponent<CodePreviewProps> = ({
  codeExample,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <NoSsr>
      <div
        className={classNames(
          "relative w-full bg-[#24292E]  rounded-lg mb-10 overflow-auto",
          {
            "h-[240px] max-h-[240px] overflow-hidden": !isExpanded,
            "h-full min-h-[240px]": isExpanded,
          }
        )}
      >
        <div className="flex items-center justify-between bg-[#21201E] h-12 m-2 rounded-lg p-4 ">
          <div className="flex items-center justify-between">
            <Link href="https://www.npmjs.com/package/@getflip/swirl-components">
              <a className="flex justify-center items-center text-[#F2F2F2] text-base font-medium mr-4">
                npm package
                <FlipIconOpenInNew className="ml-1" size={16} />
              </a>
            </Link>
            <CodeSandboxButton code={codeExample.code} />
          </div>
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
                <FlipIconCheckStrong size={16} className="ml-1" />
              ) : (
                <FlipIconCopy size={16} className="ml-1" />
              )}
            </button>
          </CopyToClipboard>
        </div>
        <SyntaxHighlighter
          wrapLines
          wrapLongLines
          style={dark}
          customStyle={{
            backgroundColor: "#24292E",
            padding: "0.5rem 1.5rem 4rem 1.5rem", // place for the expand button
            height: "100%",
          }}
        >
          {codeExample.code}
        </SyntaxHighlighter>
        {codeExample.isLongCode && (
          <div className="absolute bottom-0 flex justify-center items-center w-full h-12  bg-[#24292E]">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bottom-2 left-auto right-auto flex justify-center items-center text-[#F2F2F2] text-base font-medium"
            >
              {isExpanded ? "Collapse" : "Expand"}
              {isExpanded ? (
                <FlipIconExpandLess className="ml-2" size={24} />
              ) : (
                <FlipIconExpandMore className="ml-2" size={24} />
              )}
            </button>
          </div>
        )}
      </div>
    </NoSsr>
  );
};
