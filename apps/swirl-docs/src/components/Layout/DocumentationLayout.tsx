import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { MDXRemote } from "next-mdx-remote";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";

export type ComponentExample = {
  description: string;
  url: string;
  title: string;
};

type FrontMatter = {
  title: string;
  description: string;
  tags?: string[];
  examples: ComponentExample[];
};

interface DocumentationLayoutProps {
  documentLinkList: DocHeadline[];
  categoryLinkList: NavItem[] | undefined;
  mdxComponents: any;
  document: any;
  frontMatter?: FrontMatter;
}

export const DocumentationLayout = ({
  documentLinkList,
  categoryLinkList,
  mdxComponents,
  document,
  frontMatter,
}: DocumentationLayoutProps) => {
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
                {frontMatter?.title && (
                  <header className="border-b-1 pb-12 mb-12">
                    <div className="mb-1 inline-flex items-center">
                      <h1 className="text-4xl text-text-default ">
                        {frontMatter.title}
                      </h1>
                      {frontMatter.tags?.map((tag) => (
                        <span
                          className="bg-surface-neutral-subdued px-2 py-1 rounded-md ml-2 font-medium text-sm"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-lg leading-line-height-xl text-text-default">
                      {frontMatter.description}
                    </p>
                  </header>
                )}
                {frontMatter?.examples?.map((example) => {
                  return (
                    <div key={example.url} className="mb-12">
                      <h2>Variants</h2>
                      <p className="text-lg text-text-default mb-12">
                        This demo lets you preview the button component, its
                        variations, and configuration options. Each tab displays
                        a different type of button.
                      </p>
                      <iframe
                        width="100%"
                        height="500"
                        src={example.url}
                        frameBorder="0"
                      ></iframe>
                    </div>
                  );
                })}
                <MDXRemote {...document} components={mdxComponents} />
              </article>
            </main>
          </div>
          <DocLinksNav documentLinkList={documentLinkList} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
