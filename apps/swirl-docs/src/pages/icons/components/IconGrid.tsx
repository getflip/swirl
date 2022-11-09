import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import { FunctionComponent, LegacyRef, useEffect } from "react";
import Grid from "src/components/Grid";
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
  const [getRef, setRef] = useDynamicRefs();

  return (
    <Grid
      className="grid grid-cols-2 md:grid-cols-fill-rows gap-4 w-full"
      data={iconList}
    >
      {iconList?.map((icon: string, index: number) => (
        <a
          role="gridcell"
          aria-label={icon}
          key={`${icons[icon]?.name}-${index}`}
          tabIndex={index === 0 ? 0 : -1}
          ref={setRef(icon) as LegacyRef<HTMLAnchorElement>}
          onKeyDown={(event) =>
            handleGridKeyDown(event, { data: iconList, index }, getRef)
          }
          href={`#${icons[icon]?.name}`}
          onClick={() => handleTileClick(icons[icon]?.name)}
          className="flex flex-col justify-center items-center py-4 border-1 rounded-lg"
        >
          <i
            className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}
          ></i>
          <span className="text-text-subdued">{icons[icon]?.name}</span>
        </a>
      ))}
    </Grid>
  );
};

export default IconGrid;
