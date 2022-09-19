import { DocCategory, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";

export const DocumentationLayout = ({
  categoryLinkList,
  documentLinkList,
  children,
}: {
  categoryLinkList: DocCategory[];
  documentLinkList: DocHeadline[];
  children: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-full">
      <CategoryNav categoryLinkList={categoryLinkList} />
      {children}
      <DocLinksNav documentLinkList={documentLinkList} />
      <Footer />
    </div>
  );
};
