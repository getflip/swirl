import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { AlgoliaRecord } from "@swirl/lib/search";
import { AlgoliaRecordDataGenerator } from "./AlgoliaDataFactory";

export default class FlipApiDocAlgoliaRecordGenerator
  implements AlgoliaRecordDataGenerator
{
  generate(): AlgoliaRecord[] {
    const records: AlgoliaRecord[] = [];

    apiDocsNavItems.forEach((navItem) => {
      if (navItem.mdxFilename) {
        records.push({
          objectID: navItem.mdxFilename,
          title: navItem.title,
          type: "apiDoc",
          path: navItem.url,
        });
      }
    });
    return records;
  }
}
