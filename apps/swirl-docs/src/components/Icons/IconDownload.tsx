import {
  SwirlButton,
  SwirlButtonGroup,
  SwirlMenu,
  SwirlMenuItem,
  SwirlPopover,
  SwirlPopoverTrigger,
  SwirlStack,
} from "@getflip/swirl-components-react";
import classNames from "classnames";
import { FunctionComponent, useState } from "react";
import { IconData } from "src/pages/icons";
import NoSsr from "../Layout/NoSsr";
import { initializeIconDownload } from "./utils";

interface IconDownloadProps {
  icon: IconData;
}

export const IconDownload: FunctionComponent<IconDownloadProps> = ({
  icon,
}) => {
  const [iconPixelSize, setIconPixelSize] = useState(24);

  function handleActionItemClick(size: number): void {
    setIconPixelSize(size);
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
      <SwirlButtonGroup className="hidden md:block" segmented stretch>
        <SwirlButton
          intent="primary"
          variant="flat"
          label={`Download ${iconPixelSize}px Icon`}
          type="button"
          onClick={() => handleIconDownload()}
          size="l"
          icon=""
        />
        <SwirlPopoverTrigger popover="icon-size-menu-popover">
          <SwirlButton
            aria-label="Icon Size Trigger"
            type="button"
            id="icon-size-trigger"
            intent="primary"
            variant="flat"
            icon="<swirl-icon-expand-more></swirl-icon-expand-more>"
            label={"Change Size"}
            hideLabel
            size="l"
            className={classNames("max-w-[2.5rem]")}
          />
        </SwirlPopoverTrigger>
      </SwirlButtonGroup>

      <SwirlStack className="md:hidden" align="stretch" spacing="8">
        <SwirlButton
          key="16"
          intent="primary"
          label="Download size 16px"
          onClick={() => handleActionItemClick(16)}
          textAlign="start"
          variant="plain"
        ></SwirlButton>
        <SwirlButton
          key="24"
          intent="primary"
          label="Download size 24px"
          onClick={() => handleActionItemClick(24)}
          textAlign="start"
          variant="plain"
        ></SwirlButton>
        <SwirlButton
          key="28"
          intent="primary"
          label="Download size 28px"
          onClick={() => handleActionItemClick(28)}
          textAlign="start"
          variant="plain"
        ></SwirlButton>
      </SwirlStack>

      <SwirlPopover
        className="hidden md:block"
        id="icon-size-menu-popover"
        label="Icon sizes"
        placement="bottom-end"
      >
        <SwirlMenu label="Icon sizes">
          <SwirlMenuItem
            key="16"
            label="16px"
            onClick={() => handleActionItemClick(16)}
          ></SwirlMenuItem>
          <SwirlMenuItem
            key="24"
            label="24px"
            onClick={() => handleActionItemClick(24)}
          ></SwirlMenuItem>
          <SwirlMenuItem
            key="28"
            label="28px"
            onClick={() => handleActionItemClick(28)}
          ></SwirlMenuItem>
        </SwirlMenu>
      </SwirlPopover>
    </NoSsr>
  );
};
