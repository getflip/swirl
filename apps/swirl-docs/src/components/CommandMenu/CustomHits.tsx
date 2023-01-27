import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useState } from "react";
import { useHits } from "react-instantsearch-hooks-web";
import { CommandHit } from "./CommandHit";

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
            <CommandHit
              key={hit.objectId}
              title={hit.objectID}
              description={hit.objectID}
              icon={
                <div className="w-5 h-5 bg-surface-warning-default rounded-border-radius-xs"></div>
              }
              handleOnFocus={() => setActiveItem(hit)}
              handleOnSelect={() => {
                router.push(activeItem.path.replace("-tokens", ""));
              }}
            />
          ))}
        </Command.Group>
      )}
      {componentHits.length > 0 && (
        <Command.Group>
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Components
          </h3>
          {componentHits.map((hit: any) => (
            <CommandHit
              key={hit.objectId}
              title={hit.objectID}
              description={hit.objectID}
              icon={
                <img
                  className="w-5 h-5"
                  src="/images/component.svg"
                  alt="component"
                />
              }
              handleOnFocus={() => setActiveItem(hit)}
              handleOnSelect={() => {
                router.push(activeItem.path);
              }}
            />
          ))}
        </Command.Group>
      )}
    </>
  );
}
