import "@algolia/autocomplete-theme-classic";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import React, { createElement, Fragment, useEffect, useRef } from "react";
import { render } from "react-dom";
import { searchClient } from "./Algolia";
import { ALGOLIA_INDEX } from "@swirl/lib/search";
import { useRouter } from "next/router";

export function Autocomplete(props: any) {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      getSources: ({ query }) => [
        {
          sourceId: "actions",
          templates: {
            item({ item }: any) {
              return <p>{item.title}</p>;
            },
          },
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: ALGOLIA_INDEX.DEV,
                  query,
                },
              ],
            });
          },
          onSelect(params: any) {
            console.log("params", params);
            const { item, setQuery } = params;

            const path = item.path.replace("-tokens", "");
            router.push(path);
          },
        },
      ],
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div className="hidden md:block" ref={containerRef} />;
}
