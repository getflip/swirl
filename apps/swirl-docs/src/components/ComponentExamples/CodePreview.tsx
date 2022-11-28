import {
  FlipIconCopy,
  FlipIconExpandLess,
  FlipIconExpandMore,
  FlipIconOpenInNew,
} from "@getflip/swirl-components-react";
import classNames from "classnames";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CodePreviewProps {
  exampleCode: string;
}

export const CodePreview: FunctionComponent<CodePreviewProps> = ({
  exampleCode,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        "relative w-full bg-[#24292E]  rounded-lg mb-10 overflow-auto",
        {
          "max-h-[240px] overflow-hidden": !isExpanded,
          "h-full": isExpanded,
        }
      )}
    >
      <div className="flex items-center justify-between bg-[#21201E] h-12 m-2 rounded-lg p-4 ">
        <div className="flex items-center justify-between">
          <Link href="#">
            <a className="flex justify-center items-center text-[#F2F2F2] text-base font-medium mr-4">
              npm package
              <FlipIconOpenInNew className="ml-1" size={16} />
            </a>
          </Link>
          <Link href="#">
            <a className="flex justify-center items-center text-[#F2F2F2] text-base font-medium">
              edit in sandbox
              <FlipIconOpenInNew className="ml-1" size={16} />
            </a>
          </Link>
        </div>
        <CopyToClipboard text={exampleCode}>
          <button className="flex justify-center items-center text-[#F2F2F2] text-base font-medium">
            copy
            <FlipIconCopy size={16} className="ml-1" />
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        language="javascript"
        style={dark}
        customStyle={{
          backgroundColor: "#24292E",
          padding: "1.5rem",
          height: "100%",
        }}
      >
        {exampleCode}
      </SyntaxHighlighter>
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
    </div>
  );
};
