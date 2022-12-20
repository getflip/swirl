import { FunctionComponent } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import Hits from "./Hits";
import { ALGOLIA_INDEX } from "@swirl/lib/search";

// Initialize the Algolia client
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!!
);

interface FCProps {}

export const AlgoliaSearch: FunctionComponent<FCProps> = ({}) => {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX.DEV}>
        <SearchBox />
        <Hits />
      </InstantSearch>
    </>
  );
};
