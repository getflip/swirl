import { IconsMetaData } from "../../pages/icons";
import IconGridItem from "./IconGridItem";
import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import { FunctionComponent, LegacyRef } from "react";
import Grid from "src/components/Grid";

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
        <IconGridItem
          index={index}
          key={`${icons[icon]?.name}-${index}`}
          role="gridcell"
          aria-label={icon}
          ref={setRef(icon) as LegacyRef<HTMLAnchorElement>}
          handleTileClick={() => handleTileClick(icons[icon]?.name)}
          handleKeyDown={(event) =>
            handleGridKeyDown(event, { data: iconList, index }, getRef)
          }
          icon={icon}
          icons={icons}
          id={`${icons[icon]?.name}-${index}`}
        />
      ))}
    </Grid>
  );
};

export default IconGrid;

// const stuff = () => (
//   <a
//     tabIndex={index === 0 ? 0 : -1}
//     onKeyDown={(event) =>
//       handleGridKeyDown(event, { data: iconList, index }, getRef)
//     }
//   >
//     <i className={`swirl-icons-${icons[icon]?.name}28 text-icon-strong`}></i>
//     <span className="text-text-subdued">{icons[icon]?.name}</span>
//   </a>
// );
