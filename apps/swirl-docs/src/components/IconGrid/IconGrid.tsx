import { IconsMetaData } from "../../pages/icons";
import IconGridItem from "./IconGridItem";
import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import { FunctionComponent, LegacyRef } from "react";
import Grid from "src/components/Grid";
<<<<<<<< HEAD:apps/swirl-docs/src/components/Icons/IconGrid.tsx
import { IconsMetaData } from "../../pages/icons";
========
>>>>>>>> main:apps/swirl-docs/src/components/IconGrid/IconGrid.tsx

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
