import path from "path";

export function generatePagesPath(category: string): string {
  return path.resolve(`src/pages/${category}`);
}

export const SWIRL_COMPONENTS_PATH = path.resolve(
  process.cwd(),
  `../../packages/swirl-components/src/components`
);

export function generateSwirlComponentsPath(component: string): string {
  return path.resolve(
    process.cwd(),
    `${SWIRL_COMPONENTS_PATH}/${component}/${component}.mdx`
  );
}
