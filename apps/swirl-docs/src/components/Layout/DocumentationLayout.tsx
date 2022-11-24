import {
  FlipActionList,
  FlipActionListItem,
  FlipButton,
  FlipButtonGroup,
  FlipPopover,
  FlipSpinner,
} from "@getflip/swirl-components-react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import IframeResizer from "iframe-resizer-react";
import { MDXRemote } from "next-mdx-remote";
import { useEffect, useRef, useState } from "react";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import NoSsr from "./NoSsr";
import classNames from "classnames";
import { VariantPreview } from "../ComponentExamples/VariantPreview";
import { DocumentationHeader } from "../Documentation/DocumentationHeader";

export type ComponentExample = {
  description: string;
  url: string;
  title: string;
};

export type FrontMatter = {
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
                  <DocumentationHeader frontMatter={frontMatter} />
                )}
                {frontMatter?.variantsDescription && (
                  <VariantPreview frontMatter={frontMatter} />
                )}
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
