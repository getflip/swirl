import { FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { NavItem } from "@swirl/lib/navigation";
import { MDXRemote } from "next-mdx-remote";
import { CategoryNav } from "./CategoryNav";
import { DocLinksNav } from "./DocLinksNav";
import Footer from "./Footer";
import { DocumentationHeader } from "../Documentation/DocumentationHeader";
import { ComponentPreview } from "../ComponentPreview";
import { useToC } from "@swirl/lib/hooks/useToC";
import classNames from "classnames";
import Oas from "oas";
import { OASDocument } from "oas/dist/rmoas.types";
import { oasToSnippet } from "@readme/oas-to-snippet";
import { CodePreview } from "../CodePreview";
import oasToHar from "@readme/oas-to-har";

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
  oasSpec?: OASDocument;
}

export const DocumentationLayout = ({
  categoryLinkList,
  mdxComponents,
  document,
  frontMatter,
  oasSpec,
}: DocumentationLayoutProps) => {
  const hasFrontMatterTitle = frontMatter?.title;
  const isComponentDoc = frontMatter?.examples ? true : false;
  const isApiDoc = !!oasSpec;

  // if (isApiDoc) {
  const oas = new Oas(oasSpec!);

  const operation = oas.operation("/app-compatibility", "get");

  const har = oasToHar(oas, operation);

  const formData = {
    query: { sort: "desc" },
  };

  const auth = {
    oauth2: "bearerToken",
  };

  const language = "curl";

  console.log("EXAMPLES", operation.getResponseExamples());

  const exampleValuesOrEnums =
    operation.getParametersAsJSONSchema()[0].schema.properties;
  console.log(exampleValuesOrEnums);
  const requiredParams =
    operation.getParametersAsJSONSchema()[0].schema.required;

  // if (Array.isArray(requiredParams)) {
  //   const queryStringArray = requiredParams.map((param, i) => {
  //     if (exampleValuesOrEnums) {
  //       const requiredProperty = exampleValuesOrEnums[param];

  //       if (!(requiredProperty instanceof Boolean)) {
  //         console.log("REQUIRED PROPERTY", requiredProperty);
  //         if (i === 0) {
  //           return `?${param}=`;
  //         }
  //         return `&${param}=`;
  //       }
  //     }
  //   });

  //   console.log(queryStringArray);
  // }

  const { code, highlightMode } = oasToSnippet(
    oas,
    operation,
    formData,
    auth,
    language
  );
  // }

  const [tocItems] = useToC(document, isComponentDoc);

  return (
    <div className="flex">
      <CategoryNav categoryLinkList={categoryLinkList} />
      <div className="h-full w-full">
        <main
          id="main"
          className={classNames(
            "grid grid-cols-1 md:grid-cols-[minmax(0,_45rem)_16rem] gap-8 justify-center",
            "my-0 mx-auto mt-14 mb-4 md:mb-0 px-4 lg:px-0"
          )}
        >
          <article className="w-full max-w-[45rem]">
            {hasFrontMatterTitle && (
              <DocumentationHeader frontMatter={frontMatter} />
            )}
            {isComponentDoc && <ComponentPreview frontMatter={frontMatter} />}
            <MDXRemote {...document} components={mdxComponents} />
            {isApiDoc && (
              <>
                <CodePreview
                  codeExample={{
                    code: code as string,
                    language: "bash",
                    isLongCode: false,
                    request: har.log.entries[0].request,
                  }}
                >
                  <CodePreview.Request />
                </CodePreview>
              </>
            )}
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
