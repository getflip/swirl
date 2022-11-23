import {
  FlipActionList,
  FlipActionListItem,
  FlipButton,
  FlipButtonGroup,
  FlipPopover,
} from "@getflip/swirl-components-react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { MDXRemote } from "next-mdx-remote";
import { useEffect, useState } from "react";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import NoSsr from "./NoSsr";

export type ComponentExample = {
  description: string;
  url: string;
  title: string;
};

type FrontMatter = {
  title: string;
  description: string;
  tags?: string[];
  variantsDescription?: string;
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
  const [currentExample, setCurrentExample] = useState<ComponentExample>(
    frontMatter?.examples[0]!!
  );

  useEffect(() => {
    console.log(currentExample);
  }, [currentExample]);

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
                <div className="mb-12">
                  <h2 className="text-2xl text-text-default mb-4">Variants</h2>
                  <p className="text-lg text-text-default mb-12">
                    {frontMatter?.variantsDescription}
                  </p>
                  <NoSsr>
                    <FlipButtonGroup className="mb-2">
                      <FlipButton
                        id="variant-trigger"
                        label={`Variant: ${currentExample.title}`}
                        variant="flat"
                        icon="<flip-icon-expand-more></flip-icon-expand-more>"
                        iconPosition="end"
                      ></FlipButton>
                      <FlipPopover
                        label="Variants"
                        popoverId="variant-trigger-popover"
                        trigger="variant-trigger"
                      >
                        <FlipActionList>
                          {frontMatter?.examples.map((example) => (
                            <FlipActionListItem
                              size="m"
                              key={example.title}
                              label={example.title}
                              onClick={() => {
                                setCurrentExample(example);
                              }}
                            ></FlipActionListItem>
                          ))}
                        </FlipActionList>
                      </FlipPopover>
                      <FlipButton
                        id="theme-trigger"
                        label="Theme"
                        variant="flat"
                        icon="<flip-icon-expand-more></flip-icon-expand-more>"
                        iconPosition="end"
                        onClick={() => console.log("click")}
                      ></FlipButton>
                      <FlipPopover
                        label="Themes"
                        popoverId="theme-trigger-popover"
                        trigger="theme-trigger"
                      >
                        <FlipActionList>
                          <FlipActionListItem
                            onClick={() => console.log("clicked event")}
                            label="Hello World"
                          ></FlipActionListItem>
                        </FlipActionList>
                      </FlipPopover>
                      <FlipButton label="View RTL" variant="flat"></FlipButton>
                    </FlipButtonGroup>
                  </NoSsr>
                  <iframe
                    width="100%"
                    height="280"
                    src={currentExample.url}
                    frameBorder="0"
                    className="border-2 border-border-default rounded-lg bg-surface-raised-default"
                  ></iframe>
                </div>
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
