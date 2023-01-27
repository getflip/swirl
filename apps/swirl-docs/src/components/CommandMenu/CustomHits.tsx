import classNames from "classnames";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useState } from "react";
import { useHits } from "react-instantsearch-hooks-web";

export function CustomHits() {
  const router = useRouter();
  const { hits } = useHits();
  const [activeItem, setActiveItem] = useState<any>();

  const tokensHits = hits.filter((hit: any) => hit.path.includes("-tokens"));
  const componentHits = hits.filter((hit: any) =>
    hit.path.includes("components")
  );

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
              onFocus={() => setActiveItem(hit)}
              onSelect={() => {
                router.push(activeItem.path.replace("-tokens", ""));
              }}
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
                  <div className="w-5 h-5 bg-surface-warning-default rounded-border-radius-xs"></div>
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
              onFocus={() => setActiveItem(hit)}
              onSelect={() => {
                router.push(activeItem.path);
              }}
            >
              <button
                className={classNames(
                  "flex w-full h-full py-2",
                  "bg-surface-overlay-default",
                  "hover:bg-surface-hovered",
                  "focus:bg-surface-pressed",
                  "active:bg-surface-pressed",
                  "outline-none"
                )}
              >
                <div className="inline-flex items-center max-w-5 max-h-5 pl-4 pr-3">
                  <img
                    className="w-5 h-5"
                    src="/images/component.svg"
                    alt="component"
                  />
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
