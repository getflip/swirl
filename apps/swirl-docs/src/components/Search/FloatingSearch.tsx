import { FunctionComponent, useCallback } from "react";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
} from "kbar";
import { RenderResults } from "./SearchResult";
import useDocsActions from "@swirl/lib/hooks/useDocActions";
import { InstantSearch, useHits } from "react-instantsearch-hooks-web";
import { searchClient } from "./Algolia";
import { ALGOLIA_INDEX } from "@swirl/lib/search";

export const FloatingSearch: FunctionComponent = () => {
  useDocsActions();

  return (
    <KBarPortal>
      <KBarPositioner className="flex items-center border-1 border-border-default bg-black/60">
        <KBarAnimator className="">
          <div className="w-full md:w-[42rem] max-w-[42rem] overflow-hidden bg-surface-overlay-default rounded-border-radius-sm border-1 border-border-default">
            <InstantSearch
              searchClient={searchClient}
              indexName={ALGOLIA_INDEX.DEV}
            >
              <KBarSearch
                className="flex w-full px-4 py-3 h-12 max-h-[3rem] outline-none border-b-2 border-border-default"
                placeholder="Search..."
              />
              <RenderResults />
            </InstantSearch>
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};
