import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import React, { createElement, Fragment, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { searchClient } from "./Algolia";
import { ALGOLIA_INDEX } from "@swirl/lib/search";
import { useRouter } from "next/router";

export function Autocomplete(props: any) {
  const router = useRouter();
  const containerRef = useRef(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
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
  }, [props, router]);

  return <div className="hidden md:block w-80" ref={containerRef} />;
}
