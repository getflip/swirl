import { DocCategory, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { InView, useInView } from "react-intersection-observer";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";

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
      <InView>
        {({ inView, ref, entry }) => {
          console.log("entry", entry);
          return (
            <main
              ref={ref}
              className="col-span-8 flex justify-center items-start"
            >
              {children}
            </main>
          );
        }}
      </InView>
      <DocLinksNav documentLinkList={documentLinkList} />
    </div>
  );
};
