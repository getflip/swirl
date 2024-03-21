import { apiEndpointDocumentation } from "@swirl/lib/navigation/src/data/apiEndpoints.data";
import { GetStaticPathsResult } from "next";

export async function createStaticPathsForSpec(): Promise<
  GetStaticPathsResult["paths"]
> {
  const paths = apiEndpointDocumentation
    .map((api) =>
      api.resources.map((resource) => ({
        params: {
          apiName: api.id,
          apiResource: resource.id,
        },
      }))
    )
    .flat();

  return paths;
}
