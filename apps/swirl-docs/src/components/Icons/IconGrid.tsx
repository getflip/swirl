import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import classNames from "classnames";
import { FunctionComponent, LegacyRef, useEffect, useMemo } from "react";
import Grid from "src/components/Grid";
import { IconsMetaData } from "src/pages/components";
import { IconData } from "src/pages/icons";
import IconGridItem from "./IconGridItem";

interface IconGridProps {
  iconList: string[];
  icons: IconsMetaData;
  selectedIcon: IconData;
  handleTileFocus: (event: any) => void;
  handleTileClick: (iconName: string) => void;
}

export const IconGrid: FunctionComponent<IconGridProps> = ({
  iconList,
  icons,
  selectedIcon,
  handleTileFocus,
  handleTileClick,
}) => {
  const [getRef, setRef] = useDynamicRefs();
  const map = useMemo(() => new Map<string, React.RefObject<unknown>>(), []);

  useEffect(() => {
    console.log("icons change", iconList.length);
    // map.forEach((ref: React.RefObject<any>) => {
    //   if (ref.current) ref.current.tabIndex = -1;
    // });

    const firstRef = map.get(iconList[0]) as React.RefObject<any>;
    if (firstRef.current) firstRef.current.tabIndex = 0;
  }, [iconList, map]);

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
          reference={setRef(icon, map) as LegacyRef<HTMLAnchorElement>}
          handleTileClick={() => handleTileClick(icons[icon]?.name)}
          handleTileFocus={() => handleTileFocus(icons[icon]?.name)}
          handleKeyDown={(event) =>
            handleGridKeyDown(event, { data: iconList, index }, map, getRef)
          }
        />
      ))}
    </Grid>
  );
};

export default IconGrid;
