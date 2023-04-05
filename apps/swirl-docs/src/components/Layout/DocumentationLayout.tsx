import { CategoryNav } from "./CategoryNav";
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

interface DocumentationLayoutProps {
  data: TDocumentationLayout;
  content: ReactNode | ReactNode[];
  header?: ReactNode | ReactNode[];
  footer?: ReactNode | ReactNode[];
  disableToc?: boolean;
}

export function DocumentationLayout({
  header,
  content,
  footer,
  data,
  disableToc = false,
}: DocumentationLayoutProps) {
  const [tocItems] = useToC(data.mdxContent?.document!, false);

  return (
    <DocumentationLayoutContext.Provider value={data}>
      <div className="flex">
        {data.navigationLinks && <CategoryNav />}
        <div className="h-full w-full">
          <main
            id="main"
            className={classNames(
              "grid grid-cols-1 md:grid-cols-[minmax(0,_45rem)_16rem] gap-8 justify-center",
              "my-0 mx-auto mt-14 mb-4 md:mb-0 px-4 lg:px-0",
              {
                "md:grid-cols-1 md:mx-10": disableToc,
              }
            )}
          >
            <div className={"w-full"}>
              {header}
              {content}
            </div>
            {!disableToc && tocItems && tocItems.length > 0 && (
              <DocLinksNav documentLinkList={tocItems} />
            )}
          </main>
          {footer}
        </div>
      </div>
    </DocumentationLayoutContext.Provider>
  );
}

DocumentationLayout.Navigation = CategoryNav;
DocumentationLayout.Header = DocumentationHeader;
DocumentationLayout.ComponentPreview = ComponentPreview;
DocumentationLayout.MDX = MDXDocument;
// todo DocumentationLayout.ApiDoc = ApiDoc;
DocumentationLayout.Footer = Footer;
