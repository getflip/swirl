import classNames from "classnames";
import { useCodePreviewContext } from "./CodePreviewContext";
import { CopyButton } from "./CodePreviewCopyButton";
import {
  SwirlActionListItem,
  SwirlIconCheck,
  SwirlIconChevronRight,
} from "@getflip/swirl-components-react";
import { useState } from "react";
import { autoUpdate, flip, shift } from "@floating-ui/dom";
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import classnames from "classnames";

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
    <span className="text-font-size-sm text-text-on-image leading-5 font-font-weight-normal break-words h-full">
      {codeExample.request?.url}
      {/* /api/v1/resources/userdata/query/parameter1/parameter2/parameter3/parameter4/parameter5/parameter6/parameter7/parameter8/parameter9/parameter10/parameter11/parameter12 */}
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
        "box-border flex items-start",
        "w-full max-h-full h-auto min-h-[2.25rem] rounded-lg",
        "p-2",
        {
          "bg-[#21201E]": !isLightTheme,
          "bg-surface-overlay-default": isLightTheme,
        }
      )}
    >
      <span className="shrink-0 basis-0">{PreviewIndicator}</span>
      <span className="grow min-w-0" style={{ overflowWrap: "anywhere" }}>
        {MainHeaderContent}
      </span>
      <div className="shrink-0 basis-0 flex items-center">
        <RequestLanguage />
        <CopyButton code={codeExample.code} />
      </div>
    </div>
  );
}

function RequestLanguage() {
  const [isOpen, setIsOpen] = useState(true);

  const { refs, context, x, y } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top-start",
    middleware: [flip({ fallbackAxisSideDirection: "start" }), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        className={classnames(
          "relative flex items-center justify-center",
          "bg-transparent max-h-5 text-interactive-neutral-default text-font-size-sm",
          "pr-2",
          "after:block after:absolute after:h-full after:bg-border-default after:w-[1px] after:opacity-20 after:right-0"
        )}
        id="requestlanguage-trigger"
        onClick={() => setIsOpen(!isOpen)}
        {...getReferenceProps()}
      >
        Language
        <span className="rotate-90 max-h-[1.25rem] max-w-[1.25rem]">
          <SwirlIconChevronRight size={20} />
        </span>
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          className="absolute z-10 border border-border-default rounded-lg overflow-hidden w-[12rem] max-w-[12rem] py-2 bg-surface-overlay-default"
          {...getFloatingProps()}
          style={{
            top: `${y}px`,
            left: `${x}px`,
          }}
        >
          <button
            type="button"
            className={classnames(
              "inline-flex items-center justify-between w-full px-4 py-2 max-h-[2.5]",
              "bg-surface-overlay-default hover:bg-surface-overlay-hovered active:bg-surface-overlay-pressed",
              "text-start text-font-size-sm leading-5 font-font-weight-medium",
              {
                "text-text-highlight": true,
              }
            )}
          >
            ruby
            <span className="w-4 h-4">
              <SwirlIconCheck size={16} />
            </span>
          </button>
          <button
            type="button"
            className={classnames(
              "w-full px-4 py-2 max-h-[2.5]",
              "bg-surface-overlay-default hover:bg-surface-overlay-hovered active:bg-surface-overlay-pressed",
              "text-start text-font-size-sm leading-5 font-font-weight-medium"
            )}
          >
            javascript
          </button>
        </div>
      )}
    </div>
  );
}