import fs from "fs";
import { GetStaticPathsResult } from "next";
import {
  API_SPEC_PATH,
  generateDocumentationPath,
  generatePagesPath,
} from "@swirl/lib/navigation";
import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";
import {
  DocCategory,
  Document,
  DocumentationCategory,
  DOCUMENTATION_SRC,
  StaticPathMapType,
} from "./docs.model";

export const StaticPathMap: StaticPathMapType = {
  components: "componentDoc",
  icons: "iconDoc",
  tokens: "tokenDoc",
  api: "apiDoc",
} as const;

/***********************************************
 * Helper Functions
 ***********************************************/
function generateDocPath(document: Document) {
  return document.documentationSrc === DOCUMENTATION_SRC.DOCUMENTATION
    ? generateDocumentationPath(document.basePath)
    : generatePagesPath(document.basePath);
}

function getFileType(path: string, file: string) {
  return fs.statSync(`./src/documents/${path}/${file}`).isDirectory()
    ? "directory"
    : "file";
}

export function createStaticPathsForSpecs(): GetStaticPathsResult["paths"] {
  return fs.readdirSync(API_SPEC_PATH).filter(isYamlFile).map(createSpecPath);
}

function isYamlFile(file: string) {
  return file.includes(".yml") || file.includes(".yaml");
}

/***********************************************
 * Generate Documentation based on MDX files
 ***********************************************/

/**
 * Generate a list of static paths for the documentation
 */
export function createStaticPathsData(
  category: DocumentationCategory
): GetStaticPathsResult["paths"] {
  const docCategory = createDocCategory({
    name: category,
    basePath: category,
    documentationSrc: DOCUMENTATION_SRC.DOCUMENTATION,
  });

  return docCategory.subdirectories?.map((document: DocCategory) => ({
    params: {
      [StaticPathMap[category]]: document.name,
    },
  })) as GetStaticPathsResult["paths"];
}

/**
 * Generate a document object based on the file name
 */
function generateDoc(file: string, document: Document): DocCategory {
  const fileType = getFileType(document.basePath, file);
  const fileName = file.split(".")[0];
  if (fileType === "directory") {
    return createDocCategory({
      name: fileName,
      basePath: `${document.basePath}/${file}`,
      documentationSrc: document.documentationSrc,
    });
  }

  return {
    name: fileName,
    path: `/${document.basePath}/${fileName}`,
  };
}

/**
 * Generate a list of static paths for the documentation
 */
export function createDocCategory(document: Document): DocCategory {
  const path = generateDocPath(document);

  const files = fs.readdirSync(path);

  const subdirectories = files
    .map((file) => generateDoc(file, document))
    .filter(Boolean) as DocCategory[];

  return {
    name: document.name,
    path: document.basePath,
    ...(subdirectories.length > 0 && { subdirectories }),
  };
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
