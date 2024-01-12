import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import { AlgoliaRecordHits, HitComponentGenerator } from ".";
import { CommandHit } from "../CommandHit";

export class ComponentHitsGenerator implements HitComponentGenerator {
  type: AlgoliaRecord["type"] = "component";
  generateHits(hits: AlgoliaRecordHits, onSelected?: () => void): JSX.Element {
    if (hits.length === 0) {
      return <></>;
    }

    return (
      <Command.Group
        heading={
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Components
          </h3>
        }
      >
        {hits.map((hit) => (
          <ComponentHit hit={hit} key={hit.objectID} onSelected={onSelected} />
        ))}
      </Command.Group>
    );
  }
}

function ComponentHit({
  hit,
  onSelected,
}: {
  hit: Parameters<ComponentHitsGenerator["generateHits"]>[0][number];
  onSelected?: () => void;
}) {
  const router = useRouter();
  return (
    <CommandHit
      key={hit.objectID}
      title={hit.objectID}
      description={hit.objectID}
      icon={
        <img className="w-5 h-5" src="/images/component.svg" alt="component" />
      }
      handleOnSelect={() => {
        if (!hit.path) {
          return;
        }

        router.push(hit.path);
        onSelected?.();
      }}
    />
  );
}
