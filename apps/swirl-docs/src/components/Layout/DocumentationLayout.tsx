import { DocHeadline, FrontMatter } from "@swirl/lib/docs/src/docs.model";
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

  console.log("tocItems", tocItems);

  return (
    <div className={`flex min-h-[calc(100vh_-_72px)]`}>
      <CategoryNav categoryLinkList={categoryLinkList} />
      <div>
        <div className="flex h-full">
          <div className="w-full md:w-min max-w-[60rem] grow shrink-0">
            <main
              id="main"
              className="flex flex-col justify-center items-center"
            >
              <article className="max-w-3xl px-4 mt-20">
                {hasFrontMatterTitle && (
                  <DocumentationHeader frontMatter={frontMatter} />
                )}
                {isComponentDoc && (
                  <ComponentPreview frontMatter={frontMatter} />
                )}
                <MDXRemote {...document} components={mdxComponents} />
              </article>
            </main>
          </div>
          <DocLinksNav documentLinkList={tocItems} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
