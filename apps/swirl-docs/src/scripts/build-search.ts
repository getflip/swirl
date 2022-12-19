import { DOCUMENTATION_CATEGORY, createStaticPathsData } from "@swirl/lib/docs";
import { generateSerializableDocumentation } from "@swirl/lib/docs/src/singleDoc";

import dotenv from "dotenv";

async function generateAlgoliaData() {
  dotenv.config();

  console.log(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY
  );

  const categoryDocs = createStaticPathsData(DOCUMENTATION_CATEGORY.COMPONENTS);

  categoryDocs?.forEach(async (doc) => {
    const { componentDoc } = doc.params;
    const document = generateSerializableDocumentation(
      DOCUMENTATION_CATEGORY.COMPONENTS,
      componentDoc
    );

    console.log(document);
  });
}

// script execution
generateAlgoliaData();
