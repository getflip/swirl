import { FunctionComponent, LegacyRef } from "react";
import classNames from "classnames";
import { IconsMetaData } from "src/pages/icons";
import NoSsr from "../Layout/NoSsr";
import { MobileView, DesktopView } from "../View/Views";
import { SwirlPopoverTrigger } from "@getflip/swirl-components-react";

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
  function IconName() {
    return (
      <span
        className={classNames(
          "text-text-subdued font-normal text-font-size-sm",
          "max-w-[calc(100%_-_16px)]",
          "md:max-w-[calc(188px_-_16px)]",
          "supports-[not(container-type:inline-size)]:w-24",
          "supports-[not(container-type:inline-size)]:text-center",
          "overflow-hidden",
          "text-ellipsis"
        )}
      >
        {icons[icon]?.name}
      </span>
    );
  }

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
          <IconName />
        </a>
      </DesktopView>
      <MobileView>
        <div role={role}>
          <SwirlPopoverTrigger popover="icon-popover">
            <a
              id={`icon-popover-trigger`}
              tabIndex={index === 0 ? 0 : -1}
              ref={reference}
              href={`#${icons[icon]?.name}`}
              className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
              onKeyDown={(event) => handleKeyDown(event)}
              onClick={() => {
                handleTileClick(icons[icon]?.name);
              }}
            >
              <i
                className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
              ></i>
              <IconName />
            </a>
          </SwirlPopoverTrigger>
        </div>
      </MobileView>
    </NoSsr>
  );
};

export default IconGridItem;
