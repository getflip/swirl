import { DocSearch } from "@docsearch/react";

import "@docsearch/css";
import { ALGOLIA_INDEX } from "@swirl/lib/search";

function DocSearchComponent() {
  return <DocSearch appId="" indexName={ALGOLIA_INDEX.DEV} apiKey="" />;
}

export default DocSearchComponent;
