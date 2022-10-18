import { DocCategory, DocHeadline, DOCUMENTATION_SRC } from "./docs.model";
import { createLinkListForDocument } from "./singleDoc";
import { createDocCategory } from "./multipleDocs";

export function createLinkLists(
  category: string,
  documentId: string
): {
  documentLinkList: DocHeadline[];
  categoryLinkList: DocCategory[] | undefined;
} {
  const documentLinkList = createLinkListForDocument(category, documentId);

  const categoryLinkList = createDocCategory(
    {
      name: category,
      basePath: category,
    },
    DOCUMENTATION_SRC.DOCUMENTATION
  ).subpages;

  return {
    documentLinkList,
    categoryLinkList,
  };
}
