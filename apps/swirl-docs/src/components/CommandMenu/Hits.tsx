import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import { FunctionComponent } from "react";
import { useHits } from "react-instantsearch-hooks-web";
import HitComponentFactory from "./HitComponentFactory";

interface CustomHitsProps {
  currentSearchString: string;
  onSelected?: () => void;
}

export const Hits: FunctionComponent<CustomHitsProps> = ({
  currentSearchString,
  onSelected,
}) => {
  const { hits } = useHits<AlgoliaRecord>();
  const hasSearchString = currentSearchString.length > 0;
  const hasNoResults = hasSearchString && !HitComponentFactory.hasHits;

  const hitComponents = HitComponentFactory.getHitComponents(hits, onSelected);

  return (
    <>
      {hasNoResults && <NoItemsFound />}
      {Object.values(hitComponents)}
    </>
  );
};

function NoItemsFound() {
  return (
    <Command.Group>
      <Command.Item className="py-2 pl-4 text-text-default text-font-size-sm">
        No Items found
      </Command.Item>
    </Command.Group>
  );
}
