import { ALGOLIA_INDEX, AlgoliaRecord } from "@swirl/lib/search";
import algoliasearch from "algoliasearch";

async function validateEnvironment() {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
    throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
  }
}

export async function sendDataToAlgolia(data: Array<AlgoliaRecord>) {
  await validateEnvironment();

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY!!
  );

  const index = client.initIndex(ALGOLIA_INDEX.DEV);

  const algoliaResponse = await index.saveObjects(data);

  console.log(
    `🎉 Sucessfully added ${
      algoliaResponse.objectIDs.length
    } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
      "\n"
    )}`
  );
}
