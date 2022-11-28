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
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import Link from "next/link";
import {
  FlipIconCopy,
  FlipIconExpandLess,
  FlipIconExpandMore,
  FlipIconOpenInNew,
} from "@getflip/swirl-components-react";
import classNames from "classnames";
import { CodePreview } from "../ComponentExamples/CodePreview";

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

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  const exampleCode = `const app = (
    <AppProvider i18n={enTranslations}>
      <Button onClick={() => alert('Button clicked!')}>Example button</Button>
    </AppProvider>
  );`;

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
                  <>
                    <VariantPreview
                      isLoading={isLoading}
                      currentExample={currentExample}
                      frontMatter={frontMatter}
                      setIsLoading={setIsLoading}
                      handleExampleChange={(example) =>
                        setCurrentExample(example)
                      }
                    />
                    <CodePreview exampleCode={exampleCode} />
                    {hasProps && (
                      <PropsTable
                        componentPropsData={componentPropsData}
                      ></PropsTable>
                    )}
                  </>
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
