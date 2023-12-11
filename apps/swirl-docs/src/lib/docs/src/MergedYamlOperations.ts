import { API_SPEC_PATH } from "@swirl/lib/navigation";
import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";
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

  return [
    {
      params: {},
    },
  ];
}

function isYamlFile(file: string) {
  return file.includes(".yml") || file.includes(".yaml");
}

/***********************************************
 * Generate Documentation based on OpenAPI files
 ***********************************************/
function createSpecPath(spec: string) {
  const apiDoc = apiSpecsNavItems.find((item) => item.specName?.includes(spec));

  const apiSpecParam = apiDoc?.url.replace("/api-docs/", "");

  return {
    params: {
      apiSpec: apiSpecParam,
    },
  };
}
