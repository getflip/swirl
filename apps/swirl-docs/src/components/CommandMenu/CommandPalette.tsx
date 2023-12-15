import { ALGOLIA_INDEX } from "@swirl/lib/search";
import classNames from "classnames";
import { Command } from "cmdk";
import { useEffect, useRef, useState } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import { searchClient } from "../Search/Algolia";
import { useRouter } from "next/router";
import { CustomHits } from "./CustomHits";
import { SearchClient } from "algoliasearch/lite";
import commandPaletteObserver, {
  CommandPaletteObserver,
} from "@swirl/lib/search/commandPaletteObserver";

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

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const router = useRouter();
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const containerRef = useRef(null);

  const onOpenStateUpdate: CommandPaletteObserver = (isOpen: boolean) => {
    storeActiveElement();
    setOpen(isOpen);
  };

  function storeActiveElement() {
    const previousFocusedElement = document.activeElement || document.body;
    previousActiveElement.current = previousFocusedElement as HTMLElement;
  }

  function restoreActiveElement() {
    previousActiveElement.current?.focus();
  }

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setOpen(false);
    });
  }, [router, open]);

  useEffect(() => {
    if (!open) {
      restoreActiveElement();
    }
  }, [open]);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: any) => {
      const isCmdKCombo = e.key === "k" && e.metaKey;
      const isSlash = e.key === "/";
      if (isCmdKCombo || isSlash) {
        if (!open) {
          storeActiveElement();
        }
        setOpen((open) => {
          return !open;
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // observer pattern for isOpen State
  useEffect(() => {
    commandPaletteObserver.subscribe(onOpenStateUpdate);
    return () => commandPaletteObserver.unsubscribe(onOpenStateUpdate);
  });

  return (
    <div
      className={classNames(
        "fixed top-0 z-[20] h-screen w-screen",
        "bg-black/60",
        {
          hidden: !open,
          block: open,
        }
      )}
    >
      <Command.Dialog
        className={classNames(
          "fixed top-4 md:top-32 left-[50%] translate-x-[-50%] w-[90%] md:w-full max-w-xl z-20",
          "border-1 rounded-border-radius-sm overflow-hidden",
          "bg-surface-default border-border-default"
        )}
        open={open}
        onOpenChange={() => setOpen(!open)}
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
            onChangeCapture={(e: any) => setSearchString(e.target.value)}
          />

          <Command.List className="max-h-[36rem] overflow-y-auto" tabIndex={0}>
            <CustomHits
              currentSearchString={searchString}
              onSelected={() => setOpen(false)}
            />
          </Command.List>
        </InstantSearch>
      </Command.Dialog>
    </div>
  );
};
