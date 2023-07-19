import {
  Prop,
  SwirlComponent,
  SwirlComponentCodePreview,
} from "@swirl/lib/components/src/components.model";
import { ComponentExample } from "@swirl/lib/docs/src/docs.model";
import { useCallback, useEffect, useState } from "react";
import { PropsTable } from "./PropsTable";
import { VariantPreview } from "./VariantPreview";
import prettier from "prettier/standalone";
import prettierHTML from "prettier/parser-html";
import { CodePreview } from "../CodePreview";
import { CodeExample } from "../CodePreview/types";
import { useDocumentationLayoutContext } from "../Layout/DocumentationLayoutContext";
import { NpmPackageLink } from "../CodePreview/NpmPackageLink";
import { CodeSandboxButton } from "../CodePreview/CodeSandboxButton";

export function ComponentPreview() {
  const { frontMatter, componentsJSON } = useDocumentationLayoutContext();

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
        isLongCode: el.outerHTML.split("\n").length > 7,
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

  const getSwirlComponentData = useCallback(
    (name: string): SwirlComponent => {
      const tag = `swirl-${name.toLowerCase().replace(/ /g, "-")}`;

      const component = componentsJSON?.components.find(
        (c: any) => c.tag === tag
      ) as unknown as SwirlComponent;

      if (!component) {
        throw new Error(`Component ${tag} not found`);
      }
      return component;
    },
    [componentsJSON]
  );

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
  }, [frontMatter, getSwirlComponentData]);

  useEffect(() => {
    if (componentData) {
      // TO DO: add support for multiple examples in mdx file structure
      setCodeExample(generateCodePreview());
    }

    const codeExample = generateCodePreview();
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
      <CodePreview
        hasCopyButton
        codeExample={{
          code: codeExample.code,
          isLongCode: codeExample.code.split("\n").length > 7,
        }}
        MainHeaderContent={
          <div className="flex">
            <CodePreview.NpmPackageLink />
            <CodePreview.CodeSandboxButton />
          </div>
        }
      />
      {hasComponentProps && (
        <PropsTable componentPropsData={componentData.props}></PropsTable>
      )}
    </>
  );
}
