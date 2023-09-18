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
  SwirlButtonGroup,
  SwirlButton,
} from "@getflip/swirl-components-react";
import classNames from "classnames";
import { FunctionComponent, useState } from "react";
import { IconData } from "src/pages/icons";
import { initializeIconDownload } from "./utils";
import NoSsr from "../Layout/NoSsr";

interface IconDownloadProps {
  icon: IconData;
}

export const IconDownload: FunctionComponent<IconDownloadProps> = ({
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconPixelSize, setIconPixelSize] = useState(24);

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
    await initializeIconDownload({
      iconName: icon?.name,
      iconPixelSize: size ? size : iconPixelSize,
    });
  }
  return (
    <NoSsr>
      <SwirlButtonGroup
        segmented
        stretch
        className={classNames({ "rounded-b-none": isOpen })}
      >
        <SwirlButton
          intent="primary"
          variant="flat"
          label={`Download ${iconPixelSize}px Icon`}
          type="button"
          onClick={() => handleIconDownload()}
          size="l"
          icon=""
        />
        <SwirlButton
          aria-label="Icon Size Trigger"
          type="button"
          ref={reference}
          id="icon-size-trigger"
          {...getReferenceProps()}
          intent="primary"
          variant="flat"
          icon="<swirl-icon-expand-more></swirl-icon-expand-more>"
          label={"Change Size"}
          hideLabel
          size="l"
          className={classNames("max-w-[2.5rem]")}
        />
      </SwirlButtonGroup>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover w-full border border-border-default rounded-border-radius-sm overflow-hidden"
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
    </NoSsr>
  );
};
