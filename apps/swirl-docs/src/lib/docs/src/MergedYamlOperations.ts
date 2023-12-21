import { API_SPEC_PATH } from "@swirl/lib/navigation";
import { GetStaticPathsResult } from "next";
import OASNormalize from "oas-normalize";
import OASBuilder from "./oasBuilder";

export async function createStaticPathsForSpec(): Promise<
  GetStaticPathsResult["paths"]
> {
  const oasDocument = await new OASNormalize(`${API_SPEC_PATH}/merged.yml`, {
    enablePaths: true,
  }).validate();

  const oasBuilder = await new OASBuilder(oasDocument).dereference();

  const oasBuilderDereffed = oasBuilder.setApiDocumentations();

  const paths = oasBuilderDereffed.apiDocumentations
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
