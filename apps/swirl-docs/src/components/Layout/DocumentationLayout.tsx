import {
  ComponentExample,
  DocHeadline,
  FrontMatter,
} from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { MDXRemote } from "next-mdx-remote";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import { VariantPreview } from "../ComponentExamples/VariantPreview";
import { DocumentationHeader } from "../Documentation/DocumentationHeader";
import { useEffect, useState } from "react";
import { getSwirlComponentData } from "@swirl/lib/components";
import {
  Prop,
  SwirlComponent,
} from "@swirl/lib/components/src/components.model";
import { PropsTable } from "../ComponentExamples/PropsTable";

interface DocumentationLayoutProps {
  documentLinkList: DocHeadline[];
  categoryLinkList: NavItem[] | undefined;
  document: any;
  mdxComponents?: any;
  frontMatter?: FrontMatter;
}

export const DocumentationLayout = ({
  documentLinkList,
  categoryLinkList,
  mdxComponents,
  document,
  frontMatter,
}: DocumentationLayoutProps) => {
  const [currentExample, setCurrentExample] = useState<ComponentExample | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [componentPropsData, setComponentPropsData] = useState<Prop[] | null>(
    null
  );
  const hasProps = componentPropsData && componentPropsData.length > 0;

  useEffect(() => {
    setIsLoading(true);
    if (frontMatter?.examples) {
      setCurrentExample(frontMatter?.examples[0]);
      const component = getSwirlComponentData(
        frontMatter?.title
      ) as SwirlComponent;

      setComponentPropsData(component.props);
    }
  }, [frontMatter]);

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
                {frontMatter?.examples && (
                  <VariantPreview
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    handleExampleChange={(example) =>
                      setCurrentExample(example)
                    }
                    currentExample={currentExample}
                    frontMatter={frontMatter}
                  />
                )}
                {hasProps && (
                  <PropsTable
                    componentPropsData={componentPropsData}
                  ></PropsTable>
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
