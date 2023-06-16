import {
  SwirlIconCheckStrong,
  SwirlIconCopy,
} from "@getflip/swirl-components-react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useCodePreviewContext } from "./CodePreviewContext";

export function CopyButton() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { codeExample } = useCodePreviewContext();

  return (
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
        className="hidden md:flex justify-center items-center w-5 h-5 text-interactive-neutral-default text-base font-medium ml-2"
      >
        {isCopied ? (
          <SwirlIconCheckStrong size={16} className="ml-1" />
        ) : (
          <SwirlIconCopy size={16} className="ml-1" />
        )}
      </button>
    </CopyToClipboard>
  );
}
