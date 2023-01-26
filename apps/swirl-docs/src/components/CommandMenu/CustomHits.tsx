import { SwirlIconDescription } from "@getflip/swirl-components-react";
import classNames from "classnames";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useHits } from "react-instantsearch-hooks-web";

function transformItems(items: any) {
  return items.map((item: any) => {
    if (item.path.includes("-tokens")) {
      return {
        ...item,
        icon: <SwirlIconDescription size={20} />,
        path: item.path.replace("-tokens", ""),
      };
    }
    return {
      ...item,
    };
  });
}

export function CustomHits() {
  const router = useRouter();
  const { hits, results, sendEvent } = useHits();
  // const transformedHits = transformItems(hits);

  const tokensHits = hits.filter((hit: any) => hit.path.includes("-tokens"));
  const componentHits = hits.filter((hit: any) =>
    hit.path.includes("components")
  );

  console.log("tokens", tokensHits);
  console.log("components", componentHits);

  return (
    <>
      {tokensHits.length > 0 && (
        <Command.Group>
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Tokens
          </h3>
          {tokensHits.map((hit: any) => (
            <Command.Item
              key={hit.objectID}
              onSelect={() => router.push(hit.path)}
            >
              <button
                className={classNames(
                  "flex w-full h-full py-2",
                  "bg-surface-overlay-default",
                  "hover:bg-surface-hovered",
                  "focus:bg-surface-hovered",
                  "active:bg-surface-pressed",
                  "outline-none"
                )}
              >
                <div className="inline-flex items-center max-w-5 max-h-5 pl-4 pr-3">
                  {hit.icon}
                </div>
                <div>
                  <h4 className="text-font-size-sm font-medium text-text-default">
                    {hit.objectID}
                  </h4>
                  <p className="text-font-size-sm font-normal text-text-subdued">
                    {hit.objectID}
                  </p>
                </div>
              </button>
            </Command.Item>
          ))}
        </Command.Group>
      )}
      {componentHits.length > 0 && (
        <Command.Group>
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Components
          </h3>
          {componentHits.map((hit: any) => (
            <Command.Item
              key={hit.objectID}
              onSelect={() => router.push(hit.path)}
            >
              <button
                className={classNames(
                  "flex w-full h-full py-2",
                  "bg-surface-overlay-default",
                  "hover:bg-surface-hovered",
                  "focus:bg-surface-hovered",
                  "active:bg-surface-pressed",
                  "outline-none"
                )}
              >
                <div className="inline-flex items-center max-w-5 max-h-5 pl-4 pr-3">
                  <SwirlIconDescription size={20} />
                </div>
                <div>
                  <h4 className="text-font-size-sm font-medium text-text-default">
                    {hit.objectID}
                  </h4>
                  <p className="text-font-size-sm font-normal text-text-subdued">
                    {hit.objectID}
                  </p>
                </div>
              </button>
            </Command.Item>
          ))}
        </Command.Group>
      )}
    </>
  );
}
