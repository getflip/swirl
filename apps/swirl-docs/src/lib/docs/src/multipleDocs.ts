import {
  generateDocumentationPath,
  generatePagesPath,
  generateSwirlComponentsPath,
  SWIRL_COMPONENTS_PATH,
} from "@swirl/lib/navigation";
import fs from "fs";
import path from "path";
import { DocCategory, Document } from "./docs.model";

export function generateComponentsLinkList(basePath: string): DocCategory[] {
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

export function generateLinkList(document: Document): DocCategory {
  const { name, basePath } = document;
  const cwdPath = generatePagesPath(document.basePath);

  const files = fs.readdirSync(cwdPath);

  const hasSubdirectories = files.some((file) =>
    fs.statSync(`${cwdPath}/${file}`).isDirectory()
  );

  const isBasePath = basePath === name;

  if (hasSubdirectories || isBasePath) {
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

  return {
    name: document.name,
    path: document.basePath,
  };
}

export function generateDocumentationLinkList(document: Document): DocCategory {
  const { name, basePath } = document;
  const cwdPath = generateDocumentationPath(document.basePath);

  const files = fs.readdirSync(cwdPath);

  const hasSubdirectories = files.some((file) =>
    fs.statSync(`${cwdPath}/${file}`).isDirectory()
  );

  const isBasePath = basePath === name;

  if (hasSubdirectories || isBasePath) {
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

  return {
    name: document.name,
    path: document.basePath,
  };
}
