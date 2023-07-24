import fs from "fs";
import OASNormalize from "oas-normalize";
import OASBuilder from "@swirl/lib/docs/src/oasBuilderSetup";
import { API_DOCS_PATH, API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
import path from "path";

/*******************************************************************************
 * Run
 ********************************************************************************/
generateApiSpecNavigation();
generateApiDocsSpecNavigation();

/*******************************************************************************
 * API Specs
 ********************************************************************************/
function createApiSpecsDataString(data: string) {
  return `
import { NavItem } from "../navigation.model";

export const apiSpecsNavItems: NavItem[] = [
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
  if (fs.existsSync(API_SPEC_PATH)) {
    const specs = fs
      .readdirSync(API_SPEC_PATH)
      .filter((file) => file.includes(".yml"));

    const navItems = await Promise.all(
      specs.map((spec) => generateApiSpecNavItems(spec))
    );

    const dataString = navItems
      .map((navItem) => JSON.stringify(navItem))
      .join(",");
    const apiSpecsData = createApiSpecsDataString(dataString);

    fs.writeFileSync(
      "./src/lib/navigation/src/data/apiSpecs.data.ts",
      apiSpecsData,
      "utf8"
    );
    console.log("Done! 🚀");
  } else {
    console.log(
      "No API specs found. Skipping generation of API specs navigation."
    );
  }
}

/*******************************************************************************
 * API Docs
 ********************************************************************************/

function createApiDocsDataString(data: string) {
  return `
import { NavItem } from "../navigation.model";

export const apiDocsNavItems: NavItem[] = [
  ${data}
];
`;
}

async function generateApiDocsSpecNavigation(): Promise<void> {
  if (fs.existsSync(API_DOCS_PATH)) {
    const files = fs.readdirSync(API_DOCS_PATH);

    const filesWithPaths = generateFileList(files);

    const dataString = filesWithPaths
      .map((navItem) => JSON.stringify(navItem))
      .join(",");
    const apiDocsData = createApiDocsDataString(dataString);

    fs.writeFileSync(
      "./src/lib/navigation/src/data/apiDocs.data.ts",
      apiDocsData,
      "utf8"
    );
    console.log("Done! 🚀");
  } else {
    console.log(
      "No API docs found. Skipping generation of API docs navigation."
    );
  }
}

function generateFileList(paths: string[], rootPath?: string): NavItem[] {
  const filteredPaths = paths.filter((pathItem) => {
    const fullPath = rootPath ? `${rootPath}/${pathItem}` : pathItem;
    const absolutePath = path.join(API_DOCS_PATH, fullPath);

    return (
      !fs.statSync(absolutePath).isDirectory() && !fullPath.includes(".gitkeep")
    );
  });

  const items = filteredPaths.map((pathItem) => {
    const fullPath = rootPath ? `${rootPath}/${pathItem}` : pathItem;
    const absolutePath = path.join(API_DOCS_PATH, fullPath);

    const isSubdirectory = fs.statSync(absolutePath).isDirectory();

    // for now no subdirectories
    if (isSubdirectory && !rootPath) {
      console.log("subdirectories currently not supported", fullPath);
      // const subdirectoryPaths = fs.readdirSync(absolutePath);
      // const children = generateFileList(subdirectoryPaths, fullPath);

      // // Here, consider the directory itself as a NavItem and the files in it as children.
      // return {
      //   title: path.basename(fullPath),
      //   url: `/api-docs/docs/${fullPath}`,
      //   isRoot: rootPath ? false : true,
      //   children,
      // };
    }

    if (!isSubdirectory) {
      return generateDocNavItems(fullPath);
    }
  }) as NavItem[];

  return items;
}

function generateDocNavItems(filePath: string): NavItem {
  const cleanedFileName = filePath.replace(".mdx", "");
  return {
    title: cleanedFileName,
    url: `/api-docs/docs/${cleanedFileName}`,
  };
}
