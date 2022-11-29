import { DocCategory, DocHeadline, DOCUMENTATION_SRC } from "./docs.model";
import { createDocCategory } from "./multipleDocs";
import { generateSerializableDocumentation } from "./singleDoc";

const HeadingMap = new Map<string, number>([
  ["#", 1],
  ["##", 2],
  ["###", 3],
  ["####", 4],
  ["#####", 5],
  ["######", 6],
]);

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

export function createLinkListForDocument(
  category: string,
  document: string
): DocHeadline[] {
  const source = generateSerializableDocumentation(category, document);
  const headlines = source.split("\n").filter((line) => line.startsWith("#"));

  return headlines.map((headline) => {
    const headlineId = headline
      .split(" ")
      .slice(1, headline.length)
      .join("-")
      .toLowerCase();

    const headlineName = headline
      .split(" ")
      .slice(1, headline.length)
      .join(" ");

    const headlineLevel = HeadingMap.get(headline.split(" ")[0]);

    return {
      id: headlineId,
      name: headlineName,
      level: headlineLevel,
    };
  });
}
