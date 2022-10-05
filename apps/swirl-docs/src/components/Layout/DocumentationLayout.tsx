import { DocCategory, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";

export const DocumentationLayout = ({
  documentLinkList,
  children,
}: {
  documentLinkList: DocHeadline[];
  children: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-full">
      <CategoryNav />
      {children}
      <DocLinksNav documentLinkList={documentLinkList} />
      <Footer />
    </div>
  );
};
