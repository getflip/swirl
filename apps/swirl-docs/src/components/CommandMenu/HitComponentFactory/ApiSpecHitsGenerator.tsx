import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import router from "next/router";
import { AlgoliaRecordHits, HitComponentGenerator } from ".";
import { Hit } from "./Hit";

export class ApiSpecHitsGenerator implements HitComponentGenerator {
  type: AlgoliaRecord["type"] = "apiSpec";
  generateHits(hits: AlgoliaRecordHits, onSelected?: () => void): JSX.Element {
    if (hits.length === 0) {
      return <></>;
    }

    return (
      <Command.Group
        heading={
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            API
          </h3>
        }
      >
        {hits.map((hit) => {
          return (
            <Hit
              key={hit.objectID}
              title={hit.title}
              icon={
                <i
                  className={`swirl-icons-NewsFilled16 text-icon-default w-5 h-5`}
                ></i>
              }
              description={hit.excerpt}
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
    );
  }
}
