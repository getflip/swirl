import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import { FunctionComponent, LegacyRef } from "react";
import Grid from "src/components/Grid";
import { IconsMetaData } from "src/pages/components";
import IconGridItem from "../IconGrid/IconGridItem";

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
  const [getRef, setRef] = useDynamicRefs();

  return (
    <Grid className="grid grid-cols-2 md:grid-cols-fill-rows gap-4 w-full">
      {iconList?.map((icon: string, index: number) => (
        <IconGridItem
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
