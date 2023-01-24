import { FunctionComponent } from "react";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
} from "kbar";
import { RenderResults } from "./SearchResult";
import useDocsActions from "@swirl/lib/hooks/useDocActions";

export const FloatingSearch: FunctionComponent = () => {
  useDocsActions();

  return (
    <KBarPortal>
      <KBarPositioner className="flex items-center border-1 border-border-default bg-black/60">
        <KBarAnimator className="">
          <div className="w-full md:w-[42rem] max-w-[42rem] overflow-hidden bg-surface-overlay-default rounded-border-radius-sm border-1 border-border-default">
            <KBarSearch
              className="flex w-full px-4 py-3 h-12 max-h-[3rem] outline-none border-b-2 border-border-default"
              placeholder="Search..."
            />
            <RenderResults />
            {/* <KBarResults
              maxHeight={1000}
              items={data}
              onRender={({ item, active }) => <ResultItem />}
            /> */}
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};
