import { SidebarNavigation } from "./SidebarNavigation";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import { DocumentationHeader } from "../Documentation/DocumentationHeader";
import { ComponentPreview } from "../ComponentPreview";
import { useToC } from "@swirl/lib/hooks/useToC";
import classNames from "classnames";
import DocumentationLayoutContext, {
  TDocumentationLayout,
} from "./DocumentationLayoutContext";
import { ReactNode, useEffect, useRef } from "react";
import MDXDocument from "./MDXDocument";
import { useRouter } from "next/router";

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

  const scrollContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handler() {
      scrollContainer.current?.scrollTo(0, 0);
    }

    router.events.on("routeChangeComplete", handler);

    return () => {
      router.events.off("routeChangeComplete", handler);
    };
  }, [router.events]);

  return (
    <DocumentationLayoutContext.Provider value={data}>
      <div className="grid grid-cols-1 lg:grid-cols-documentation-layout h-full overflow-hidden">
        {data.navigationLinks && <SidebarNavigation />}
        <div
          className={classNames(
            "flex flex-col items-center justify-between",
            "w-full h-full overflow-auto scroll-p-4"
          )}
          ref={scrollContainer}
        >
          <main
            id="main"
            className={classNames(
              "grid grid-cols-1 justify-center max-w-[77.5rem] w-full",
              "my-0 mx-auto mt-14 mb-4 md:mb-0 px-4 lg:px-10",
              {
                "xl:grid-cols-1 md:mx-10": disableToc,
              },
              {
                "xl:grid-cols-[minmax(0,_45rem)_16rem] gap-8": !disableToc,
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
