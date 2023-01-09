import { FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { MDXRemote } from "next-mdx-remote";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import { DocumentationHeader } from "../Documentation/DocumentationHeader";
import { ComponentPreview } from "../ComponentPreview";
import { useToC } from "@swirl/lib/hooks/useToC";

export type ComponentExample = {
  description: string;
  url: string;
  title: string;
};

interface DocumentationLayoutProps {
  categoryLinkList: NavItem[] | undefined;
  document: any;
  mdxComponents?: any;
  frontMatter?: FrontMatter;
}

export const DocumentationLayout = ({
  categoryLinkList,
  mdxComponents,
  document,
  frontMatter,
}: DocumentationLayoutProps) => {
  const hasFrontMatterTitle = frontMatter?.title;
  const isComponentDoc = frontMatter?.examples ? true : false;

  const [tocItems] = useToC(document, isComponentDoc);

  return (
    <div className={`flex min-h-[calc(100vh_-_72px)]`}>
      <CategoryNav categoryLinkList={categoryLinkList} />
      <div className="h-full w-full">
        <main
          id="main"
          className="grid grid-cols-1 md:grid-cols-[minmax(0,_45rem)_16rem] gap-8 justify-center my-0 mx-auto mt-14 mb-4 md:mb-0 px-4 md:px-0"
        >
          <article className="w-full max-w-[45rem]">
            {hasFrontMatterTitle && (
              <DocumentationHeader frontMatter={frontMatter} />
            )}
            {isComponentDoc && <ComponentPreview frontMatter={frontMatter} />}
            <MDXRemote {...document} components={mdxComponents} />
          </article>
          {tocItems && tocItems.length > 0 && (
            <DocLinksNav documentLinkList={tocItems} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};
