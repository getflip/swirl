import {
  API_SPEC_PATH,
  generateDocumentationPath,
  generatePagesPath,
} from "@swirl/lib/navigation";
import fs from "fs";
import { GetStaticPathsResult } from "next";
import {
  DocCategory,
  Document,
  DocumentationCategory,
  DOCUMENTATION_SRC,
  StaticPathMapType,
} from "./docs.model";
import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";

export const StaticPathMap: StaticPathMapType = {
  components: "componentDoc",
  icons: "iconDoc",
  tokens: "tokenDoc",
  api: "apiDoc",
} as const;

export function createStaticPathsForSpecs(): GetStaticPathsResult["paths"] {
  const specs = fs
    .readdirSync(`${API_SPEC_PATH}`)
    .filter((spec) => spec.includes(".yml") || spec.includes(".yaml"))
    .map((spec) => {
      const apiDoc = apiSpecsNavItems.find((item) =>
        item.specName?.includes(spec)
      );

      const apiSpecParam = apiDoc?.url.replace("/api-docs/", "");
      return {
        params: {
          apiSpec: apiSpecParam,
        },
      };
    });

  return specs;
}

export function createStaticPathsData(
  category: DocumentationCategory
): GetStaticPathsResult["paths"] {
  return createDocCategory(
    {
      name: category,
      basePath: category,
    },
    DOCUMENTATION_SRC.DOCUMENTATION
  ).subpages?.map((document: DocCategory) => ({
    params: {
      [StaticPathMap[category]]: document.name,
    },
  })) as GetStaticPathsResult["paths"];
}

export function createDocCategory(
  document: Document,
  documentationSrc: string
): DocCategory {
  const { name, basePath } = document;
  const path =
    documentationSrc === DOCUMENTATION_SRC.DOCUMENTATION
      ? generateDocumentationPath(document.basePath)
      : generatePagesPath(document.basePath);

  const files = fs.readdirSync(path);

  const hasSubdirectories = files.some((file) =>
    fs.statSync(`${path}/${file}`).isDirectory()
  );

  const isBasePath = basePath === name;

  if (hasSubdirectories || isBasePath) {
    return {
      name,
      path: basePath,
      subpages: files
        .map((file) => {
          const fileName = file.split(".")[0];
          const isDirectory = fs.statSync(`${path}/${file}`).isDirectory();
          if (isDirectory) {
            return createDocCategory(
              {
                name: fileName,
                basePath: `${document.basePath}/${file}`,
              },
              documentationSrc
            );
          }
          return {
            name: fileName,
            path: `/${document.basePath}/${fileName}`,
          };
        })
        .filter((file) => file.name !== "index"),
    };
  }

  return {
    name: document.name,
    path: document.basePath,
  };
}
