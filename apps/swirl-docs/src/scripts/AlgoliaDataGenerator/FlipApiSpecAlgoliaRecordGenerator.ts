import { apiEndpointDocumentation } from "@swirl/lib/navigation/src/data/apiEndpoints.data";
import { AlgoliaRecord } from "@swirl/lib/search";
import { AlgoliaRecordDataGenerator } from "./AlgoliaDataFactory";

export default class FlipApiSpecAlgoliaRecordGenerator
  implements AlgoliaRecordDataGenerator
{
  generate(): AlgoliaRecord[] {
    const algoliaRecords: AlgoliaRecord[] = [];

    apiEndpointDocumentation.forEach((api) => {
      api.resources.forEach((resource) => {
        resource.endpoints.forEach((endpoint) => {
          const path = `/api-docs/${api.id}/${resource.id}#${endpoint.id}`;

          algoliaRecords.push({
            type: "apiSpec",
            objectID: `${api.id}-${resource.id}-${endpoint.id}`,
            title: endpoint.title,
            excerpt: endpoint.description,
            path,
          });
        });
      });
    });

    return algoliaRecords;
  }
}
