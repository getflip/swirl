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
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX.DEV}>
        <SearchBox
          autoFocus
          placeholder="Search..."
          className="px-4 py-3 w-full outline-none border-b-1 text-text-subdued"
        />

        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <CustomHits />
        </Command.List>
      </InstantSearch>
    </Command.Dialog>
  );
};

function EmptyQueryBoundary({ children, fallback }: any) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}
