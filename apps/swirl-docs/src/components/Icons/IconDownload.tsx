import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  SwirlActionList,
  SwirlActionListItem,
  SwirlIconChevronRight,
  SwirlSpinner,
} from "@getflip/swirl-components-react";
import classNames from "classnames";
import { FunctionComponent, useState } from "react";
import { IconData } from "src/pages/icons";
import { initializeIconDownload } from "./utils";

interface IconDownloadProps {
  icon: IconData;
}

export const IconDownload: FunctionComponent<IconDownloadProps> = ({
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconPixelSize, setIconPixelSize] = useState(24);
  const [isLoadingIconDownload, setIsLoadingIconDownload] = useState(false);

  const { reference, floating, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip({ fallbackAxisSideDirection: "end" }), shift()],
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

  function handleActionItemClick(size: number): void {
    setIconPixelSize(size);
    setIsOpen(false);
    handleIconDownload(size);
  }

  async function handleIconDownload(size?: number) {
    setIsLoadingIconDownload(true);
    await initializeIconDownload({
      iconName: icon?.name,
      iconPixelSize: size ? size : iconPixelSize,
    });
    setIsLoadingIconDownload(false);
  }
  return (
    <>
      <div
        className={classNames(
          "inline-flex justify-center items-center w-full font-medium text-white py-2",
          "bg-surface-info-default hover:bg-surface-highlight-hovered active:bg-surface-highlight-pressed",
          {
            "rounded-border-radius-sm": !isOpen,
            "rounded-t-border-radius-sm": isOpen,
          }
        )}
      >
        <button
          className="w-full max-h-6 text-center"
          onClick={() => handleIconDownload()}
          type="button"
        >
          {isLoadingIconDownload ? (
            <SwirlSpinner label="loading icon from server" size="s" />
          ) : (
            `Download ${iconPixelSize}px Icon`
          )}
        </button>
        <button
          aria-label="Icon Size Trigger"
          type="button"
          ref={reference}
          id="icon-size-trigger"
          className={classNames(
            "relative w-6 h-6 mx-2",
            "before:absolute before:top-0 before:left-[-8px] before:h-[24px] before:w-[1px] before:bg-text-on-action-primary"
          )}
          {...getReferenceProps()}
        >
          <SwirlIconChevronRight className="rotate-90" />
        </button>
      </div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover w-full border border-border-default rounded-b-border-radius-sm overflow-hidden"
            ref={floating}
            style={{
              position: strategy,
            }}
            {...getFloatingProps()}
          >
            <SwirlActionList>
              <SwirlActionListItem
                size="m"
                key="16"
                label="16px"
                onClick={() => handleActionItemClick(16)}
              ></SwirlActionListItem>
              <SwirlActionListItem
                size="m"
                key="24"
                label="24px"
                onClick={() => handleActionItemClick(24)}
              ></SwirlActionListItem>
              <SwirlActionListItem
                size="m"
                key="28"
                label="28px"
                onClick={() => handleActionItemClick(28)}
              ></SwirlActionListItem>
            </SwirlActionList>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
