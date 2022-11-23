import useDynamicRefs, {
  handleGridKeyDown,
} from "@swirl/lib/hooks/useDynamicRefs";
import { FunctionComponent, LegacyRef } from "react";
import Grid from "src/components/Grid";
import { NavItem } from "@swirl/lib/navigation";
import Image from "next/image";

interface ComponentGridProps {
  labelledBy: string;
  componentList: NavItem[];
}

export const ComponentGrid: FunctionComponent<ComponentGridProps> = ({
  componentList,
  labelledBy,
}) => {
  const [getRef, setRef] = useDynamicRefs();

  return (
    <Grid
      labelledBy={labelledBy}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full"
    >
      {componentList?.map((component: NavItem, index: number) => (
        <a
          key={index}
          aria-labelledby={component.title.replaceAll(" ", "-")}
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
          <article
            role="gridcell"
            className="flex flex-col min-h-[330px] min-w-[256px] border-1 rounded-lg"
          >
            <header className="flex justify-center items-center min-h-[10rem] max-h-[10rem] bg-surface-raised-default rounded-t-lg">
              <div className="relative w-10 h-10">
                <Image
                  layout="fill"
                  sizes="100%"
                  src="/images/placeholder.png"
                  alt={component.title}
                />
              </div>
            </header>
            <footer className="p-4">
              <h3
                id={component.title.replaceAll(" ", "-")}
                className="text-font-size-base font-semibold capitalize"
              >
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
