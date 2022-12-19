import {
  BASE_PATHS,
  createStaticPathsData,
  DOCUMENT_ENUM,
} from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";

import dotenv from "dotenv";

// const dotenv = require("dotenv");
// const algoliasearch = require("algoliasearch/lite");

async function generateAlgoliaData() {
  // initialize environment variables
  dotenv.config();

  console.log(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY
  );

  const categoryDocs = createStaticPathsData(
    BASE_PATHS.COMPONENTS,
    DOCUMENT_ENUM.COMPONENTS
  );

  categoryDocs?.forEach(async (doc: any) => {
    const document = await generateMdxFromDocumentation(
      BASE_PATHS.COMPONENTS,
      doc
    );

    console.log(document);
  });

  console.log(categoryDocs);
}

// script execution
generateAlgoliaData();
