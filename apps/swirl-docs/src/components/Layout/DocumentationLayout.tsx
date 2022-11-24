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
                  <table className="mb-10 w-full">
                    <thead>
                      <tr className="grid gap-2 grid-cols-6 border-b-1 pb-4">
                        <th className="col-span-2 font-semibold text-start">
                          Prop
                        </th>
                        <th className="col-span-2 font-semibold text-start">
                          Type
                        </th>
                        <th className="col-span-2 font-semibold text-start">
                          Required
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentPropsData.map((prop: Prop) => (
                        <tr
                          key={prop.name}
                          className="grid grid-cols-6 py-4 border-b-1 items-start"
                        >
                          <td className="col-span-2">{prop.name}</td>
                          <td className="col-span-2">
                            <code className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
                              {prop.type}
                            </code>
                          </td>
                          <td className="col-span-2">
                            {prop.required.toString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
