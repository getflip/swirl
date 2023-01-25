import {
  SwirlIconCheckStrong,
  SwirlIconCopy,
  SwirlIconExpandLess,
  SwirlIconExpandMore,
  SwirlIconOpenInNew,
} from "@getflip/swirl-components-react";
import { FunctionComponent, useState } from "react";
import { CodeSandboxButton } from "./CodeSandboxButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classNames from "classnames";
import Link from "next/link";
import NoSsr from "../Layout/NoSsr";

import Prism from "prismjs";

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
          <div className="flex items-center justify-between">
            <Link href="https://www.npmjs.com/package/@getflip/swirl-components">
              <a className="flex justify-center items-center text-[#F2F2F2] text-base font-medium mr-4">
                npm package
                <SwirlIconOpenInNew className="ml-1" size={16} />
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
                <SwirlIconCheckStrong size={16} className="ml-1" />
              ) : (
                <SwirlIconCopy size={16} className="ml-1" />
              )}
            </button>
          </CopyToClipboard>
        </div>

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
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                codeExample.code,
                Prism.languages.html,
                "html"
              ),
            }}
          ></code>
        </pre>

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
    </NoSsr>
  );
};
