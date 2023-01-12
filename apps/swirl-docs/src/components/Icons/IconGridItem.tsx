import { SwirlPopover } from "@getflip/swirl-components-react";
import { FunctionComponent, LegacyRef, useEffect, useState } from "react";

import { IconsMetaData } from "src/pages/icons";
import NoSsr from "../Layout/NoSsr";
import { MobileView, DesktopView } from "../View/Views";
import IconInfo from "./IconInfo";

interface IconGridProps {
  id: string;
  icon: string;
  icons: IconsMetaData;
  role: string;
  reference: LegacyRef<HTMLAnchorElement>;
  index: number;
  handleTileClick: (iconName: string) => void;
  handleKeyDown: (event: any) => void;
}

const IconGridItem: FunctionComponent<IconGridProps> = ({
  id,
  icon,
  icons,
  role,
  reference,
  index,
  handleKeyDown,
  handleTileClick,
}) => {
  return (
    <NoSsr>
      <DesktopView>
        <a
          id={id}
          tabIndex={index === 0 ? 0 : -1}
          role={role}
          aria-label={`${icon}-icon`}
          ref={reference}
          href={`#${icons[icon]?.name}`}
          className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
          onKeyDown={(event) => handleKeyDown(event)}
          onClick={() => handleTileClick(icons[icon]?.name)}
        >
          <i
            className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
          ></i>
          <span className="text-text-subdued">{icons[icon]?.name}</span>
        </a>
      </DesktopView>
      <MobileView>
        <div role={role}>
          <a
            id={`${id}-popover-trigger`}
            tabIndex={index === 0 ? 0 : -1}
            aria-label={`${icon}-icon`}
            ref={reference}
            href={`#${icons[icon]?.name}`}
            className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
            onKeyDown={(event) => handleKeyDown(event)}
            onClick={() => handleTileClick(icons[icon]?.name)}
          >
            <i
              className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
            ></i>
            <span className="text-text-subdued">{icons[icon]?.name}</span>
          </a>
          <SwirlPopover
            label="Icon Info"
            popoverId={`popover-${id}`}
            trigger={`${id}-popover-trigger`}
          >
            <div className="p-4">
              <IconInfo icon={icons[icon]} />
            </div>
          </SwirlPopover>
        </div>
      </MobileView>
    </NoSsr>
  );
};

export default IconGridItem;
