import classNames from "classnames";
import { useCodePreviewContext } from "./CodePreviewContext";
import { CopyButton } from "./CodePreviewCopyButton";

export function CodePreviewHeader() {
  const { isLightTheme, children, hasCopyButton, codeExample } =
    useCodePreviewContext();
  return (
    <div
      className={classNames(
        "hidden md:flex items-center justify-between h-12 m-2 p-4 rounded-lg",
        {
          "bg-[#21201E]": !isLightTheme,
          "bg-surface-overlay-default": isLightTheme,
        }
      )}
    >
      <div className="flex items-center justify-between">{children}</div>
      {hasCopyButton && <CopyButton code={codeExample.code} />}
    </div>
  );
}
