import path from "path";
import { navItems } from "./data/navItems";
import { CategoryEnum, NavItem } from "./navigation.model";

export const SWIRL_COMPONENTS_PATH = path.resolve(
  process.cwd(),
  `../../packages/swirl-components/src/components`
);

export const SWIRL_TOKENS_DIST_PATH = path.resolve(
  process.cwd(),
  `../../packages/swirl-tokens/dist`
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

export function generateCategoryPaths(category: string): NavItem[] {
  console.log("category", category);
  const categoryLinks = navItems.filter((item: NavItem) =>
    item.title === category ? item : null
  )[0].children;

  return categoryLinks!!;
}
