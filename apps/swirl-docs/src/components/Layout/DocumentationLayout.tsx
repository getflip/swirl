import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { useEffect, useState } from "react";
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
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footerHeight = document.querySelector("#footer")?.clientHeight;
    if (footerHeight) {
      setFooterHeight(footerHeight);
    }
  }, []);

  return (
    <div className={`flex min-h-[calc(100vh_-_72px)]`}>
      <CategoryNav categoryLinkList={categoryLinkList} />
      <div>
        <div className="flex">
          <div className="w-full max-w-[60rem] grow shrink-0">{children}</div>
          <DocLinksNav documentLinkList={documentLinkList} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
