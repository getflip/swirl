/* eslint-disable react/display-name */
import { SwirlIconDescription } from "@getflip/swirl-components-react";
import classNames from "classnames";
import { Action, KBarResults, useMatches } from "kbar";
import React, { forwardRef, useCallback } from "react";
import { useHits } from "react-instantsearch-hooks-web";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-4 pt-4 pb-2 font-medium text-gray-400 uppercase ">
            {item}
          </div>
        ) : (
          <ResultItem item={item} active={active} />
        )
      }
    />
  );
}

const ResultItem = forwardRef(
  (
    {
      active,
      item,
    }: {
      active: boolean;
      item: Action;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={classNames({
          "bg-surface-overlay-hovered": active,
          transparent: !active,
        })}
      >
        <div className="flex w-full h-full py-2">
          <div className="inline-flex items-center max-w-5 max-h-5 pl-4 pr-3">
            <SwirlIconDescription size={20} />
          </div>
          <div>
            <h4 className="text-font-size-sm font-medium text-text-default">
              {item.name}
            </h4>
            <p className="text-font-size-sm font-normal text-text-subdued">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

function Search() {
  const transformItems = useCallback(
    (items: any) =>
      items.map((item: any) => ({
        ...item,
      })),
    []
  );
  const { hits } = useHits({
    transformItems,
  });

  console.log(hits);

  return (
    <div>
      {hits.map((item) => {
        return (
          <div key={item.objectID}>
            <>
              {item.objectID} {item.path}
            </>
          </div>
        );
      })}
    </div>
  );
}
