import {
  generateDocumentationPath,
  generatePagesPath,
  generateSwirlComponentsPath,
  SWIRL_COMPONENTS_PATH,
} from "@swirl/lib/navigation";
import fs from "fs";
import {
  BasePath,
  DocCategory,
  Document,
  DOCUMENTATION_SRC,
} from "./docs.model";

export function createSwirlComponentDocCategories(
  basePath: BasePath
): DocCategory[] {
  const components = fs.readdirSync(SWIRL_COMPONENTS_PATH);

  const componentDocPaths = components.map((component) => {
    return {
      htmlTag: component,
      name: component.split("-").join(" "),
      path: generateSwirlComponentsPath(component),
      nextRoute: `/${basePath}/${component}`,
    };
  });

  return componentDocPaths;
}

export function createStaticPathsData(category: string):
  | {
      params: {
        id: string;
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
      id: document.name,
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
