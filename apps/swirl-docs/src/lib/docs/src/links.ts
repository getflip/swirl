import { DocCategory, DOCUMENTATION_SRC } from "./docs.model";
import { createDocCategory } from "./multipleDocs";

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
