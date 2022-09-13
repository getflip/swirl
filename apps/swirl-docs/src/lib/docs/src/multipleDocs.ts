import {
  generatePagesPath,
  generateSwirlComponentsPath,
  SWIRL_COMPONENTS_PATH,
} from "@swirl/lib/navigation";
import fs from "fs";
import { DocCategory, Document } from "./docs.model";

export function generateComponentsLinkList(): DocCategory[] {
  const components = fs.readdirSync(SWIRL_COMPONENTS_PATH);

  const componentDocPaths = components.map((component) => {
    return {
      name: component.split("-").join(" "),
      path: generateSwirlComponentsPath(component),
    };
  });
  //   const componentPath = `${componentsPath}/${component}`;

  //   const componentFiles = fs.readdirSync(componentPath);

  //   const componentDocs = componentFiles.map((componentFile) => {
  //     const componentDoc: Document = {
  //       name: componentFile,
  //       basePath: componentPath,
  //     };

  //     return componentDoc;
  //   });

  //   const componentLinkList: DocCategory = {
  //     name: component,
  //     path: componentPath,
  //     subpages: componentDocs,
  //   };

  //   return componentLinkList;
  // });

  return componentDocPaths;
}

export function generateLinkList(document: Document): DocCategory {
  const { name, basePath } = document;
  const cwdPath = generatePagesPath(document.basePath);

  const files = fs.readdirSync(cwdPath);

  const hasSubdirectories = files.some((file) =>
    fs.statSync(`${cwdPath}/${file}`).isDirectory()
  );

  if (hasSubdirectories) {
    return {
      name,
      path: basePath,
      subpages: files
        .map((file) => {
          const fileName = file.split(".")[0];
          const isDirectory = fs.statSync(`${cwdPath}/${file}`).isDirectory();
          if (isDirectory) {
            return generateLinkList({
              name: fileName,
              basePath: `${document.basePath}/${file}`,
            });
          }
          return {
            name: fileName,
            path: `/${document.basePath}/${fileName}`,
          };
        })
        .filter((file) => file.name !== "index"),
    };
  }

  const links = files
    .map((file) => {
      const fileName = file.split(".")[0];
      return {
        name: fileName,
        path: `${document.basePath}`,
      };
    })
    .filter((file) => file.name !== "index");
  return {
    name: document.name,
    path: document.basePath,
    subpages: links,
  };
}
