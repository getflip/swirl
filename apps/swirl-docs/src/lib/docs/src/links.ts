import { DocCategory, DOCUMENTATION_SRC } from "./docs.model";
import { createDocCategory } from "./multipleDocs";

const HeadingMap = new Map<string, number>([
  ["#", 1],
  ["##", 2],
  ["###", 3],
  ["####", 4],
  ["#####", 5],
  ["######", 6],
]);

export function createLinkLists(category: string): {
  categoryLinkList: DocCategory[] | undefined;
} {
  const categoryLinkList = createDocCategory(
    {
      name: category,
      basePath: category,
    },
    DOCUMENTATION_SRC.DOCUMENTATION
  ).subpages;

  return {
    categoryLinkList,
  };
}
