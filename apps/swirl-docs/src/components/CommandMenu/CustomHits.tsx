import { SwirlIconDescription } from "@getflip/swirl-components-react";
import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { useHits } from "react-instantsearch-hooks-web";
import { IconsMetaData } from "src/pages/components";
import { CommandHit } from "./CommandHit";
import { HitTokenPreview } from "./HitTokenPreview";

interface CustomHitsProps {
  currentSearchString: string;
  onSelected?: () => void;
}

export const CustomHits: FunctionComponent<CustomHitsProps> = ({
  currentSearchString,
  onSelected,
}) => {
  const icons: IconsMetaData = require("@getflip/swirl-icons/dist/metadata.js");

  const router = useRouter();
  const { hits } = useHits<AlgoliaRecord>();

  const tokenPagesHits = hits.filter((hit) => hit.path?.includes("-tokens"));
  const tokenHits = hits.filter((hit) => hit.type === "token");

  const iconHits = hits.filter((hit) => hit.type === "icon");
  const componentHits = hits.filter((hit) => hit.path?.includes("components"));

  const hasNoResults =
    currentSearchString.length > 0 &&
    iconHits.length === 0 &&
    tokenHits.length === 0 &&
    componentHits.length === 0;
  return (
    <>
      {/* NO HITS */}
      {hasNoResults && (
        <Command.Group>
          <Command.Item className="py-2 pl-4 text-text-default text-font-size-sm">
            No Items found
          </Command.Item>
        </Command.Group>
      )}
      {/* ICON HITS */}
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
                handleOnSelect={() => {
                  if (!hit.path) {
                    return;
                  }

                  router.push(hit.path.replace("-tokens", ""));
                  onSelected?.();
                }}
              />
            );
          })}
        </Command.Group>
      )}
      {/* TOKENHITS */}
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
              handleOnSelect={(hit) => {
                if (!hit.path) {
                  return;
                }

                router.push(hit.path.replace("-tokens", ""));
                onSelected?.();
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
                handleOnSelect={() => {
                  if (!hit.path) {
                    return;
                  }

                  router.push(hit.path.replace("-tokens", ""));
                  onSelected?.();
                }}
              />
            );
          })}
        </Command.Group>
      )}
      {/* COMPONENT HITS */}
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
              handleOnSelect={() => {
                if (!hit.path) {
                  return;
                }

                router.push(hit.path);
                onSelected?.();
              }}
            />
          ))}
        </Command.Group>
      )}
    </>
  );
};
