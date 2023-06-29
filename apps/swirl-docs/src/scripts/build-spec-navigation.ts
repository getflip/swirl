import fs from "fs";
import OASNormalize from "oas-normalize";
import OASBuilder from "@swirl/lib/docs/src/oasBuilderSetup";
import { API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";

function createApiDocsDataString(data: string) {
  return `
import { NavItem } from "../navigation.model";

export const apiDocsNavItems: NavItem[] = [
  ${data}
];
`;
}

async function generateApiSpecNavItems(specName: string): Promise<NavItem> {
  const specPath = `${API_SPEC_PATH}/${specName}`;
  const oasDocument = await new (OASNormalize as any).default(specPath, {
    enablePaths: true,
  }).validate();

  const oasBuilder = new OASBuilder(oasDocument)
    .setTitleAndPath()
    .setDescription()
    .setEndpoints()
    .setOperations()
    .setTags();

  const operationNavItems: NavItem[] =
    oasBuilder.operationsList?.map((endpoint) => ({
      title: endpoint.title,
      url: `/api-docs${endpoint.path}`,
      description: endpoint.operation.method,
      isRoot: false,
    })) || [];

  return {
    title: oasBuilder.title,
    url: `/api-docs/${oasBuilder.path}`,
    isRoot: true,
    children: operationNavItems,
    specName,
  };
}

async function generateApiSpecNavigation(): Promise<void> {
  const specs = fs
    .readdirSync(API_SPEC_PATH)
    .filter((file) => file.includes(".yml"));

  const navItems = await Promise.all(
    specs.map((spec) => generateApiSpecNavItems(spec))
  );

  const dataString = navItems
    .map((navItem) => JSON.stringify(navItem))
    .join(",");
  const apiDocsData = createApiDocsDataString(dataString);

  fs.writeFileSync(
    "./src/lib/navigation/src/data/apiDocs.data.ts",
    apiDocsData,
    "utf8"
  );
  console.log("Done! 🚀");
}

generateApiSpecNavigation();
