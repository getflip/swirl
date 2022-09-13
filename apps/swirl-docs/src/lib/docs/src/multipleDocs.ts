import { generatePath } from "@swirl/lib/navigation";
import fs from "fs";

type DocCategory = {
  name: string;
  path: string;
  subpages?: any;
};

export type Document = {
  name: string;
  basePath: string;
};

export function generateLinkList(document: Document): DocCategory {
  const { name, basePath } = document;
  const cwdPath = generatePath(document.basePath);
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
