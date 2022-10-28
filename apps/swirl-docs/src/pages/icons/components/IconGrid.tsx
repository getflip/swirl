import { FunctionComponent } from "react";
import { IconsMetaData } from "..";
import IconGridItem from "./IconGridItem";

interface IconGridProps {
  iconList: string[];
  icons: IconsMetaData;
  handleTileClick: (iconName: string) => void;
}

export const IconGrid: FunctionComponent<IconGridProps> = ({
  iconList,
  icons,
  handleTileClick,
}) => {
  // ToDo: einzelnes element icon grid item
  return (
    <ul className="grid grid-cols-2 md:grid-cols-fill-rows gap-4 w-full">
      {iconList?.map((icon: string, index: number) => (
        <IconGridItem
          key={index}
          handleTileClick={() => handleTileClick(icons[icon]?.name)}
          icon={icon}
          icons={icons}
          id={`${icons[icon]?.name}-${index}`}
        />
      ))}
      {iconList?.length === 0 && <p>No icons found</p>}
    </ul>
  );
};

export default IconGrid;
