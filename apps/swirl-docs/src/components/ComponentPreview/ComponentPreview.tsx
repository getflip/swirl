import { getSwirlComponentData } from "@swirl/lib/components";
import { SwirlComponent } from "@swirl/lib/components/src/components.model";
import { ComponentExample, FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { FunctionComponent, useEffect, useState } from "react";
import { CodePreview, SwirlComponentCodePreview } from "./CodePreview";
import { PropsTable } from "./PropsTable";
import { VariantPreview } from "./VariantPreview";

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
  const hasComponentProps = componentData && componentData.props.length > 0;

  useEffect(() => {
    setIsLoading(true);
    if (frontMatter?.examples) {
      setCurrentExample(frontMatter?.examples[0]);
      const component = getSwirlComponentData(
        frontMatter?.title
      ) as SwirlComponent;

      const componentPreviewData: SwirlComponentCodePreview = {
        ...component,
        innerHtml: frontMatter?.innerHtml ? frontMatter?.innerHtml : "",
      };

      setComponentData(componentPreviewData);
    }
  }, [frontMatter]);
  return (
    <>
      <VariantPreview
        isLoading={isLoading}
        currentExample={currentExample}
        frontMatter={frontMatter!!}
        setIsLoading={setIsLoading}
        handleExampleChange={(example) => setCurrentExample(example)}
      />
      <CodePreview component={componentData} />
      {hasComponentProps && (
        <PropsTable componentPropsData={componentData.props}></PropsTable>
      )}
    </>
  );
};
