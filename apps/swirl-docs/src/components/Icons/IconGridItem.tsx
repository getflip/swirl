import { FunctionComponent, LegacyRef } from "react";
import { SwirlPopover } from "@getflip/swirl-components-react";
import classNames from "classnames";

import { IconsMetaData } from "src/pages/icons";
import NoSsr from "../Layout/NoSsr";
import { MobileView, DesktopView } from "../View/Views";
import IconInfo from "./IconInfo";
import Portal from "./Portal";

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
          aria-label={`${icon}`}
          ref={reference}
          href={`#${icons[icon]?.name}`}
          className={classNames(
            "flex flex-col justify-center items-center gap-2",
            "aspect-square",
            "supports-[not(container-type:inline-size)]:min-w-[120px]",
            "supports-[not(container-type:inline-size)]:max-w-[120px]",
            "py-4 border-1 rounded-lg",
            { "bg-background-hovered": isSelected }
          )}
          onKeyDown={(event) => handleKeyDown(event)}
          onClick={() => handleTileClick(icons[icon]?.name)}
        >
          <i
            className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong text-2xl`}
          ></i>
          <span className="text-text-subdued font-normal text-font-size-sm">
            {icons[icon]?.name}
          </span>
        </a>
      </DesktopView>
      <MobileView>
        <div role={role}>
          <a
            id={`${id}-popover-trigger`}
            tabIndex={index === 0 ? 0 : -1}
            aria-label={`${icon}`}
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
          <Portal>
            <SwirlPopover
              label="Icon Info"
              popoverId={`popover-${id}`}
              trigger={`${id}-popover-trigger`}
            >
              <div className="p-4">
                <IconInfo icon={icons[icon]} />
              </div>
            </SwirlPopover>
          </Portal>
        </div>
      </MobileView>
    </NoSsr>
  );
};

export default IconGridItem;
