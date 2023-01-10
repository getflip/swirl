import { FlipPopover } from "@getflip/swirl-components-react";
import classNames from "classnames";
import { FunctionComponent, LegacyRef } from "react";

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
  isSelected: boolean;
  handleTileClick: (iconName: string) => void;
  handleKeyDown: (event: any) => void;
}

function createFlipWCName(name: string): string {
  return (
    "flip-icon" + name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
  );
}

const IconGridItem: FunctionComponent<IconGridProps> = ({
  id,
  icon,
  icons,
  role,
  reference,
  index,
  isSelected,
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
          className={classNames(
            "flex flex-col justify-center items-center py-4 border-1 rounded-lg",
            { "bg-background-hovered": isSelected }
          )}
          onKeyDown={(event) => handleKeyDown(event)}
          onClick={() => handleTileClick(icons[icon]?.name)}
        >
          <i
            className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong text-2xl`}
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
          <FlipPopover
            label="Icon Info"
            popoverId={`popover-${id}`}
            trigger={`${id}-popover-trigger`}
          >
            <div className="p-4">
              <IconInfo icon={icons[icon]} />
            </div>
          </FlipPopover>
        </div>
      </MobileView>
    </NoSsr>
  );
};

export default IconGridItem;
