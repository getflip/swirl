import { FunctionComponent, useMemo, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import { ALGOLIA_INDEX } from "@swirl/lib/search";
import { Autocomplete } from "./AutoComplete";
import { isProd } from "@swirl/lib/gtm";

// Initialize the Algolia client
export const searchClient = () => {
  if (!isProd) {
    algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!!
    );
  }

  return algoliasearch(
    process.env.APPSETTING_NEXT_PUBLIC_ALGOLIA_APP_ID!!,
    process.env.APPSETTING_NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!!
  );
};

interface FCProps {}

export const AlgoliaSearch: FunctionComponent<FCProps> = () => {
  const [searchState] = useState({
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
      </InstantSearch>
    </>
  );
};
