import { FlipPopover } from "@getflip/swirl-components-react";
import { FunctionComponent, LegacyRef } from "react";
import { IconsMetaData } from "src/pages/icons";
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
  reference: mapRef,
  index,
  handleKeyDown,
  handleTileClick,
}) => {
  return (
    <div>
      <a
        role={role}
        aria-label={`${icon}-icon`}
        ref={mapRef}
        tabIndex={index === 0 ? 0 : -1}
        id={id}
        href={`#${icons[icon]?.name}`}
        className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
        onKeyDown={(event) => handleKeyDown(event)}
        onFocus={(event) => console.log("focus", event)}
        onClick={() => handleTileClick(icons[icon]?.name)}
      >
        <i
          className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
        ></i>
        <span className="text-text-subdued">{icons[icon]?.name}</span>
      </a>
      <FlipPopover label="Icon Info" popoverId={`popover-${id}`} trigger={id}>
        <div className="md:hidden p-4">
          <IconInfo icon={icons[icon]} />
        </div>
      </FlipPopover>
    </div>
  );
};

export default IconGridItem;
