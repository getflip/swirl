import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import classNames from "classnames";
import { FunctionComponent, LegacyRef } from "react";
import Grid from "src/components/Grid";
import { IconsMetaData } from "src/pages/components";
import { IconData } from "src/pages/icons";
import IconGridItem from "./IconGridItem";

interface IconGridProps {
  iconList: string[];
  icons: IconsMetaData;
  selectedIcon: IconData;
  handleTileClick: (iconName: string) => void;
}

export const IconGrid: FunctionComponent<IconGridProps> = ({
  iconList,
  icons,
  selectedIcon,
  handleTileClick,
}) => {
  const [getRef, setRef] = useDynamicRefs();

  return (
    <Grid
      id="icon-grid"
      className={classNames(
        "grid grid-cols-2 @xl:grid-cols-[repeat(4,_1fr)] @4xl:grid-cols-[repeat(6,_1fr)] gap-4 w-full",
        "supports-[not(container-type:inline-size)]:flex",
        "supports-[not(container-type:inline-size)]:flex-wrap"
      )}
    >
      {iconList?.map((icon: string, index: number) => (
        <IconGridItem
          isSelected={selectedIcon?.name === icons[icon]?.name}
          id={`${icons[icon]?.name}-${index}`}
          key={`${icons[icon]?.name}-${index}`}
          index={index}
          role="gridcell"
          icon={icon}
          icons={icons}
          reference={setRef(icon) as LegacyRef<HTMLAnchorElement>}
          handleTileClick={() => handleTileClick(icons[icon]?.name)}
          handleKeyDown={(event) =>
            handleGridKeyDown(event, { data: iconList, index }, getRef)
          }
        />
      ))}
    </Grid>
  );
};

export default IconGrid;
