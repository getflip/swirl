import { SidebarNavigation } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import { DocumentationHeader } from "../Documentation/DocumentationHeader";
import { ComponentPreview } from "../ComponentPreview";
import { useToC } from "@swirl/lib/hooks/useToC";
import classNames from "classnames";
import DocumentationLayoutContext, {
  TDocumentationLayout,
} from "./DocumentationLayoutContext";
import { ReactNode } from "react";
import MDXDocument from "./MDXDocument";

type DocumentationLayoutProps = {
  data: TDocumentationLayout;
  content: ReactNode | ReactNode[];
  header?: ReactNode | ReactNode[];
  disableToc?: boolean;
};

export function DocumentationLayout({
  header,
  content,
  data,
  disableToc = false,
}: DocumentationLayoutProps) {
  const [tocItems] = useToC(data.mdxContent?.document!, false);

  return (
    <DocumentationLayoutContext.Provider value={data}>
      <div className="grid grid-cols-1 lg:grid-cols-documentation-layout h-full overflow-hidden">
        {data.navigationLinks && <SidebarNavigation />}
        <div className="w-full h-full overflow-auto scroll-p-4 flex flex-col items-center">
          <main
            id="main"
            className={classNames(
              "grid grid-cols-1 justify-center max-w-[77.5rem]",
              "my-0 mx-auto mt-14 mb-4 md:mb-0 px-4 lg:px-0 lg:pl-space-40",
              {
                "md:grid-cols-1 md:mx-10": disableToc,
              },
              {
                "md:grid-cols-[minmax(0,_45rem)_16rem] gap-8": !disableToc,
              }
            )}
          >
            <div className="w-full">
              {header}
              {content}
            </div>
            {!disableToc && tocItems && tocItems.length > 0 && (
              <DocLinksNav documentLinkList={tocItems} />
            )}
          </main>
          <Footer />
        </div>
      </div>
    </DocumentationLayoutContext.Provider>
  );
}

DocumentationLayout.Navigation = SidebarNavigation;
DocumentationLayout.Header = DocumentationHeader;
DocumentationLayout.ComponentPreview = ComponentPreview;
DocumentationLayout.MDX = MDXDocument;
// todo DocumentationLayout.ApiDoc = ApiDoc;
DocumentationLayout.Footer = Footer;
