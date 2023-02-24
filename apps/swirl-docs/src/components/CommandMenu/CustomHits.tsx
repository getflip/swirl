import { SwirlIconDescription } from "@getflip/swirl-components-react";
import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { useState } from "react";
import { useHits } from "react-instantsearch-hooks-web";
import { IconsMetaData } from "src/pages/components";
import { CommandHit } from "./CommandHit";
import { HitTokenPreview } from "./HitTokenPreview";

export function CustomHits() {
  const icons: IconsMetaData = require("@getflip/swirl-icons/dist/metadata.js");

  const router = useRouter();
  const { hits } = useHits<AlgoliaRecord>();
  const [activeItem, setActiveItem] = useState<any>();

  const tokenPagesHits = hits.filter((hit) => hit.path?.includes("-tokens"));
  const tokenHits = hits.filter((hit) => hit.type === "token");

  const iconHits = hits.filter((hit) => hit.type === "icon");
  const componentHits = hits.filter((hit) => hit.path?.includes("components"));

  return (
    <>
      {iconHits.length > 0 && (
        <Command.Group>
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Icons
          </h3>
          {iconHits.map((hit) => {
            return (
              <CommandHit
                key={hit.objectID}
                title={hit.title}
                icon={
                  <i
                    className={`swirl-icons-${
                      icons[hit.title].name
                    }16 text-icon-default w-5 h-5`}
                  ></i>
                }
                handleOnFocus={() => setActiveItem(hit)}
                handleOnSelect={() => {
                  router.push(activeItem.path.replace("-tokens", ""));
                }}
              />
            );
          })}
        </Command.Group>
      )}
      {(tokenHits.length > 0 || tokenPagesHits.length > 0) && (
        <Command.Group>
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Tokens
          </h3>
          {tokenPagesHits.map((hit) => (
            <CommandHit
              key={hit.objectID}
              title={hit.objectID}
              description={hit.excerpt}
              icon={<SwirlIconDescription size={20} />}
              handleOnFocus={() => setActiveItem(hit)}
              handleOnSelect={() => {
                router.push(activeItem.path.replace("-tokens", ""));
              }}
            />
          ))}
          {tokenHits.map((hit) => {
            return (
              <CommandHit
                key={hit.objectID}
                title={hit.title}
                description={hit.excerpt}
                icon={
                  <HitTokenPreview
                    title={hit.title}
                    tokenCategory={hit.tokenCategory}
                  />
                }
                handleOnFocus={() => setActiveItem(hit)}
                handleOnSelect={() => {
                  router.push(activeItem.path.replace("-tokens", ""));
                }}
              />
            );
          })}
        </Command.Group>
      )}
      {componentHits.length > 0 && (
        <Command.Group>
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Components
          </h3>
          {componentHits.map((hit) => (
            <CommandHit
              key={hit.objectID}
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
