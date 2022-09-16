import { DocCategory, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";

export const DocumentationLayout = ({
  categoryLinkList,
  documentLinkList,
  children,
}: {
  categoryLinkList: DocCategory[] | undefined;
  documentLinkList: DocHeadline[] | undefined;
  children: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-full">
      <CategoryNav categoryLinkList={categoryLinkList} />
      <main className="col-span-8 flex justify-center items-start">
        {children}
      </main>
      <DocLinksNav documentLinkList={documentLinkList} />
    </div>
  );
};
