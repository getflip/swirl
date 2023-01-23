/* eslint-disable react/display-name */
import { SwirlIconDescription } from "@getflip/swirl-components-react";
import classNames from "classnames";
import { ActionId, ActionImpl, KBarResults, useMatches } from "kbar";
import Link from "next/link";
import React, { forwardRef } from "react";

const data = [
  {
    title: "action-list",
    excerpt:
      "The FlipActionList component is used to render a menu containing of FlipActionListSections and FlipActionListItems. It should be used in combination with the FlipPopover component.",
    type: "component",
  },
  {
    title: "autocomplete",
    excerpt:
      "The FlipAutocomplete component is used to provide a text input field showing selectable suggestions while the user interacts with the input. It should always be used in combination with the FlipFormControl component.",
    type: "component",
  },
  {
    title: "avatar",
    excerpt:
      "The FlipAvatar component is used to represent a user via an image, icon or initials.",
    type: "component",
  },
];

interface SearchResultProps {
  objectID?: any;
  title?: any;
  excerpt?: string;
  path?: string;
  tagsCollection?: {
    tags: any;
  };
}

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={data}
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
      item: any;
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
              {item.title}
            </h4>
            <p className="text-font-size-sm font-normal text-text-subdued">
              {item.excerpt}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
