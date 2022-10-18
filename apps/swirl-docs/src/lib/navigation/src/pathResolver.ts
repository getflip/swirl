import path from "path";

export const SWIRL_COMPONENTS_PATH = path.resolve(
  process.cwd(),
  `../../packages/swirl-components/src/components`
);

export function generatePagesPath(category: string): string {
  return path.resolve(`src/pages/${category}`);
}

export function generateDocumentationPath(category: string): string {
  return path.resolve(`src/documents/${category}`);
}

export function generateDocumentPath(
  category: string,
  document: string
): string {
  return path.resolve(`${generateDocumentationPath(category)}/${document}.mdx`);
}

export function generateSwirlComponentsPath(component: string): string {
  return path.resolve(
    process.cwd(),
    `${SWIRL_COMPONENTS_PATH}/${component}/${component}.mdx`
  );
}
