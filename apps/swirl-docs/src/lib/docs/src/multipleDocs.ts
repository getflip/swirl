import {
  generateDocumentationPath,
  generatePagesPath,
} from "@swirl/lib/navigation";
import fs from "fs";
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
} as const;

export function createStaticPathsData(category: DocumentationCategory):
  | {
      params: {
        [key: string]: string;
      };
    }[]
  | undefined {
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
  }));
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
