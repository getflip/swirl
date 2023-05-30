import {
  SwirlIconCheckStrong,
  SwirlIconCopy,
} from "@getflip/swirl-components-react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <CopyToClipboard
      text={code}
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
        className="flex justify-center items-center text-interactive-neutral-default text-base font-medium"
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
