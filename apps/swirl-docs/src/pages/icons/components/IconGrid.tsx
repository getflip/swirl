import { FunctionComponent } from "react";
import { IconsMetaData } from "..";

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
  return (
    <ul className="grid grid-cols-2 md:grid-cols-fill-rows gap-4 w-full">
      {iconList?.map((icon: string, index: number) => (
        <li key={`${icons[icon]?.name}-${index}`}>
          <a
            href={`#${icons[icon]?.name}`}
            onClick={() => handleTileClick(icons[icon]?.name)}
            className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
          >
            <i
              className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
            ></i>
            <span className="text-text-subdued">{icons[icon]?.name}</span>
          </a>
        </li>
      ))}
      {iconList?.length === 0 && <p>No icons found</p>}
    </ul>
  );
};

export default IconGrid;
