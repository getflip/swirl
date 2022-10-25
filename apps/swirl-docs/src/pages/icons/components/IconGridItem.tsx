import { FlipPopover } from "@getflip/swirl-components-react";
import { FunctionComponent } from "react";
import { IconsMetaData } from "..";

interface IconGridProps {
  id: string;
  icon: string;
  icons: IconsMetaData;
  handleTileClick: (iconName: string) => void;
}

export const IconGridItem: FunctionComponent<IconGridProps> = ({
  id,
  icon,
  icons,
  handleTileClick,
}) => {
  console.log("id", id);
  return (
    <li>
      <a
        id={id}
        href={`#${icons[icon]?.name}`}
        onClick={() => handleTileClick(icons[icon]?.name)}
        className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
      >
        <i
          className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
        ></i>
        <span className="text-text-subdued">{icons[icon]?.name}</span>
      </a>
      <FlipPopover label="Icon Info" popoverId={`popover-${id}`} trigger={id}>
        <h2>{id}</h2>
      </FlipPopover>
    </li>
  );
};
