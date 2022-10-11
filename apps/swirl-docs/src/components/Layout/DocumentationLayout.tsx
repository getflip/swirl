import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";

export const DocumentationLayout = ({
  documentLinkList,
  categoryLinkList,
  children,
}: {
  documentLinkList: DocHeadline[];
  categoryLinkList: NavItem[] | undefined;
  children: any;
}) => {
  return (
    <div className={`flex min-h-[calc(100vh_-_72px)]`}>
      <CategoryNav categoryLinkList={categoryLinkList} />
      <div>
        <div className="flex h-full">
          <div className="w-full max-w-[60rem] grow shrink-0">{children}</div>
          <DocLinksNav documentLinkList={documentLinkList} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
