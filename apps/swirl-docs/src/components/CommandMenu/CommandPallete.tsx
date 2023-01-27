import { ALGOLIA_INDEX } from "@swirl/lib/search";
import classNames from "classnames";
import { Command } from "cmdk";
import { useEffect, useRef, useState } from "react";
import {
  InstantSearch,
  SearchBox,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { searchClient } from "../Search/Algolia";
import { useRouter } from "next/router";
import { CustomHits } from "./CustomHits";
import { SearchClient } from "algoliasearch/lite";

const algoliaClient: SearchClient = {
  ...searchClient,
  search(requests: any) {
    if (requests.every(({ params }: any) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: "",
          params: "",
        })),
      });
    }

    return searchClient.search(requests);
  },
};

export const CommandMenu = () => {
  const down = (e: any) => {
    if (e.key === "k" && e.metaKey) {
      setOpen((open) => !open);
    }
  };

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setOpen(!open);
    });
  }, [router, open]);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div
      className={classNames(
        "fixed top-o z-[20] h-screen w-screen",
        "bg-black/60",
        {
          hidden: !open,
          block: open,
        }
      )}
    >
      <Command.Dialog
        className={classNames(
          "fixed top-32 left-[50%] translate-x-[-50%] w-full max-w-xl z-20",
          "border-1 rounded-border-radius-sm",
          "bg-surface-default border-border-default"
        )}
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
      >
        <div className="w-full h-full" ref={containerRef} />
        <InstantSearch
          searchClient={algoliaClient}
          indexName={ALGOLIA_INDEX.DEV}
        >
          <SearchBox
            autoFocus
            placeholder="Search..."
            className="px-4 py-3 w-full outline-none border-b-1 text-text-subdued"
          />

          <Command.List>
            <CustomHits />
          </Command.List>
        </InstantSearch>
      </Command.Dialog>
    </div>
  );
};
