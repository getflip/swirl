import {
  DOCUMENTATION_CATEGORY,
  createStaticPathsData,
  DocumentationCategory,
  StaticPathMap,
} from "@swirl/lib/docs";
import { generateSerializableDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { ALGOLIA_INDEX } from "@swirl/lib/search";
import algoliasearch from "algoliasearch";

import dotenv from "dotenv";

function getAlgoliaDataForCategory(
  category: DocumentationCategory
): AlogliaData {
  const categoryDocs = createStaticPathsData(category);

  const algoliaIndexableData = categoryDocs?.map((doc) => {
    const docParams = doc.params;

    const document = generateSerializableDocumentation(
      category,
      docParams[StaticPathMap[category]]
    );

    return {
      objectID: document.data.title,
      title: document.data.title,
      excerpt: document.excerpt ? document.excerpt : "",
      path: `/${category}/${document.data.title
        .toLowerCase()
        .replace(" ", "-")}`,
      tagsCollection: { tags: document.data.tags },
    };
  });

  if (!algoliaIndexableData) {
    throw new Error(
      `Could not generate Algolia data for category: ${category}`
    );
  }

  return algoliaIndexableData;
}

type AlogliaData = Record<string, any>[];

async function generateAlgoliaData() {
  dotenv.config();

  try {
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
      throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
    }

    if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
      throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
    }

    const components = getAlgoliaDataForCategory(
      DOCUMENTATION_CATEGORY.COMPONENTS
    );
    const tokens = getAlgoliaDataForCategory(DOCUMENTATION_CATEGORY.TOKENS);
    // const icons = getAlgoliaDataForCategory(DOCUMENTATION_CATEGORY.ICONS);
    const transformed = [...components, ...tokens];

    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY!!
    );

    const index = client.initIndex(ALGOLIA_INDEX.DEV);
    const algoliaResponse = await index.saveObjects(transformed);

    console.log(
      `🎉 Sucessfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (error) {
    console.error(error);
  }
}

// script execution
generateAlgoliaData();
