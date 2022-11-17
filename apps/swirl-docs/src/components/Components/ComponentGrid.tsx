import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import { FunctionComponent, LegacyRef } from "react";
import Grid from "src/components/Grid";
import { NavItem } from "@swirl/lib/navigation";

interface ComponentGridProps {
  componentList: NavItem[];
}

export const ComponentGrid: FunctionComponent<ComponentGridProps> = ({
  componentList,
}) => {
  const [getRef, setRef] = useDynamicRefs();

  return (
    <Grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {componentList?.map((component: NavItem, index: number) => (
        <a
          key={index}
          role="gridcell"
          aria-label={component.title}
          href={component.url}
          tabIndex={index === 0 ? 0 : -1}
          ref={setRef(component.title) as LegacyRef<HTMLAnchorElement>}
          onKeyDown={(event) =>
            handleGridKeyDown(
              event,
              {
                data: componentList.map((component) => component.title),
                index,
              },
              getRef
            )
          }
        >
          <article className="flex flex-col min-h-[330px] min-w-[256px] border-1 rounded-lg">
            <header className="flex justify-center items-center min-h-[10rem] max-h-[10rem] bg-surface-raised-default rounded-t-lg">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20210319191323/Screenshot39-300x120.png"
                alt={component.title}
              />
            </header>
            <footer className="p-4">
              <h3 className="text-font-size-base font-semibold">
                {component.title}
              </h3>
              <p className="text-font-size-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              </p>
            </footer>
          </article>
        </a>
      ))}
    </Grid>
  );
};

export default ComponentGrid;
