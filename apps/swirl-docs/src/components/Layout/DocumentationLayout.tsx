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
    <div className="flex h-full">
      <CategoryNav />
      <div>
        <div className="flex">
          <div className="w-full max-w-[60rem]">{children}</div>
          <DocLinksNav documentLinkList={documentLinkList} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
