import { FunctionComponent, useCallback, useMemo, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import Hits from "./Hits";
import { ALGOLIA_INDEX } from "@swirl/lib/search";
import { Autocomplete } from "./AutoComplete";

// Initialize the Algolia client
export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!!
);

interface FCProps {}

export const AlgoliaSearch: FunctionComponent<FCProps> = ({}) => {
  const [searchState, setSearchState] = useState({
    query: "",
  });
  const plugins = useMemo(() => {
    return []; // add more plugins here
  }, []);
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX.DEV}>
        <Autocomplete
          placeholder="Search"
          initialState={{
            query: searchState.query,
          }}
          openOnFocus={true}
          plugins={plugins}
          defaultActiveItemId={0}
        />
        {/* <SearchBox /> */}
        {/* <Hits /> */}
      </InstantSearch>
    </>
  );
};
