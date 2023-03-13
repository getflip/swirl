import { getSwirlComponentData } from "@swirl/lib/components";
import {
  Prop,
  SwirlComponentCodePreview,
} from "@swirl/lib/components/src/components.model";
import { ComponentExample, FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { PropsTable } from "./PropsTable";
import { VariantPreview } from "./VariantPreview";
import prettier from "prettier/standalone";
import prettierHTML from "prettier/parser-html";
import { CodePreview } from "../CodePreview";
import { CodeExample } from "../CodePreview/types";

interface ComponentPreviewProps {
  frontMatter: FrontMatter | undefined;
}

export const ComponentPreview: FunctionComponent<ComponentPreviewProps> = ({
  frontMatter,
}) => {
  const [currentExample, setCurrentExample] = useState<ComponentExample | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [componentData, setComponentData] =
    useState<SwirlComponentCodePreview | null>(null);
  const [codeExample, setCodeExample] = useState<CodeExample>({
    code: "",
    isLongCode: false,
  });
  const hasComponentProps = componentData && componentData.props.length > 0;

  const generateCodePreview = useCallback(() => {
    if (componentData?.tag) {
      const el = document.createElement(componentData.tag);

      componentData.props.forEach((prop: Prop) => {
        if (prop.default) {
          const propDefaultValue = prop.default as string;

          const cleanedPropValue = propDefaultValue.replace(/"/g, "");

          el.setAttribute(prop.attr, cleanedPropValue);
        }
      });

      if (componentData?.innerHtml) {
        el.innerHTML = componentData.innerHtml;
      }

      return {
        isLongCode: el.outerHTML.length > 180,
        code: prettier.format(el.outerHTML, {
          parser: "html",
          plugins: [prettierHTML],
        }),
      };
    }

    return {
      isLongCode: false,
      code: "",
    };
  }, [componentData]);

  useEffect(() => {
    setIsLoading(true);
    if (frontMatter?.examples) {
      const component = getSwirlComponentData(frontMatter?.title);

      setCurrentExample(frontMatter?.examples[0]);
      setComponentData({
        ...component,
        innerHtml: frontMatter?.innerHtml ? frontMatter?.innerHtml : "",
      });
    }
  }, [frontMatter]);

  useEffect(() => {
    if (componentData) {
      // TO DO: add support for multiple examples in mdx file structure
      setCodeExample(generateCodePreview());
    }
  }, [componentData, generateCodePreview, currentExample]);

  return (
    <>
      <VariantPreview
        isLoading={isLoading}
        currentExample={currentExample}
        frontMatter={frontMatter!!}
        setIsLoading={setIsLoading}
        handleExampleChange={(example) => setCurrentExample(example)}
      />
      <CodePreview codeExample={codeExample}>
        <CodePreview.NpmPackageLink />
        <CodePreview.CodeSandboxButton />
      </CodePreview>
      {hasComponentProps && (
        <PropsTable componentPropsData={componentData.props}></PropsTable>
      )}
    </>
  );
};
