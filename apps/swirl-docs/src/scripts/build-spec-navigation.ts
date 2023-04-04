import OASBuilder from "@swirl/lib/docs/src/OasBuilder";
import { ApiDoc } from "@swirl/lib/docs";
import { API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
import OASNormalize from "oas-normalize";
import fs from "fs";
import { HttpMethods } from "oas/dist/rmoas.types";

// const apiDocsData = fs.readFileSync("./src/lib/navigation/src/data/apiDocs.data.ts", "utf8");

function createapiDocsDataString(data: string) {
  return `
import { NavItem } from "../navigation.model";

export const apiDocsNavItems: NavItem[] = [
  ${data}
];
`;
}

async function generateApiSpecNavItems(specPath: string): Promise<NavItem> {
  const operationNavItems: NavItem[] = [];

  const oasDocument = await new OASNormalize(specPath, {
    enablePaths: true,
  }).validate();

  const oasBuilder = new OASBuilder(oasDocument)
    .setTitleAndPath()
    .setDescription()
    .setEndpoints()
    .setOperations();

  for (const operation in oasBuilder.operations) {
    const endpoints = oasBuilder.operations[operation as HttpMethods];

    endpoints?.forEach((endpoint) => {
      operationNavItems.push({
        title: endpoint.title,
        url: `/api-docs${endpoint.path}`,
        description: endpoint.operation.method,
        isRoot: false,
      });
    });
  }

  return {
    title: oasBuilder.title,
    url: `/api-docs/${oasBuilder.path}`,
    isRoot: true,
    children: operationNavItems,
  };
}

async function generateApiSpecNavigation() {
  let dataString = "";
  const specs = fs
    .readdirSync(API_SPEC_PATH)
    .filter((file) => file.includes(".yml"));

  for (const spec of specs) {
    const navItem = await generateApiSpecNavItems(`${API_SPEC_PATH}/${spec}`);

    dataString += `${JSON.stringify(navItem)},`;
    console.log(dataString);
  }

  const apiDocsData = createapiDocsDataString(dataString);

  fs.writeFileSync(
    "./src/lib/navigation/src/data/apiDocs.data.ts",
    apiDocsData,
    "utf8"
  );
  console.log("Done! 🚀");
}

generateApiSpecNavigation();
