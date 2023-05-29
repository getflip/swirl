import classNames from "classnames";
import { useCodePreviewContext } from "./CodePreviewContext";
import { CopyButton } from "./CodePreviewCopyButton";

export function HttpMethod() {
  const { codeExample } = useCodePreviewContext();
  return (
    <span className="text-[#A6CAFF] font-semibold text-font-size-sm mr-1 uppercase leading-5">
      {codeExample.request?.method}
    </span>
  );
}

export function ResponseIndicator() {
  return <span className="text-font-size-sm max-h-5">Response</span>;
}

export function EndpointUrl() {
  const { codeExample } = useCodePreviewContext();
  return (
    <span className="text-font-size-sm text-text-on-image leading-5 font-font-weight-normal w-[70%] break-words">
      {codeExample.request?.url}
    </span>
  );
}

export function CodePreviewHeader() {
  const {
    isLightTheme,
    hasCopyButton,
    codeExample,
    PreviewIndicator,
    MainHeaderContent,
  } = useCodePreviewContext();
  return (
    <div
      className={classNames(
        "flex items-start h-auto min-h-[2.25rem] m-2 p-2 rounded-lg",
        {
          "bg-[#21201E]": !isLightTheme,
          "bg-surface-overlay-default": isLightTheme,
        }
      )}
    >
      {PreviewIndicator}
      {MainHeaderContent}
      <select className="max-h-5">
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <CopyButton code={codeExample.code} />
    </div>
  );
}
