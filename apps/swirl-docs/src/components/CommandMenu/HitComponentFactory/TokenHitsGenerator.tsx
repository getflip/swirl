import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import router from "next/router";
import { AlgoliaRecordHits, HitComponentGenerator } from ".";
import { CommandHit } from "../CommandHit";
import { HitTokenPreview } from "../HitTokenPreview";

export class TokenHitsGenerator implements HitComponentGenerator {
  type: AlgoliaRecord["type"] = "token";
  generateHits(hits: AlgoliaRecordHits, onSelected?: () => void): JSX.Element {
    if (hits.length === 0) {
      return <></>;
    }

    return (
      <Command.Group
        heading={
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Tokens
          </h3>
        }
      >
        {hits.map((hit) => {
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
    );
  }
}
