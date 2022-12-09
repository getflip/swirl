import {
  FlipActionList,
  FlipActionListItem,
  FlipButton,
  FlipButtonGroup,
  FlipPopover,
  FlipSpinner,
} from "@getflip/swirl-components-react";
import { ComponentExample, FrontMatter } from "@swirl/lib/docs/src/docs.model";
import classNames from "classnames";
import IframeResizer from "iframe-resizer-react";
import { FunctionComponent, Suspense, useRef } from "react";
import DynamicComponent from "./DynamicComponent";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";

interface VariantPreviewProps {
  frontMatter: FrontMatter;
  currentExample: ComponentExample | null;
  isLoading: boolean;
  handleExampleChange: (example: ComponentExample) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const VariantPreview: FunctionComponent<VariantPreviewProps> = ({
  frontMatter,
  currentExample,
  isLoading,
  handleExampleChange,
  setIsLoading,
}) => {
  const variantPopover = useRef<any>(null);

  return (
    <div className="mb-6">
      <h2 id="variants" className="text-2xl text-text-default mb-4">
        Variants
      </h2>
      <p className="text-lg text-text-default mb-12">
        {frontMatter?.variantsDescription}
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        {currentExample && (
          <DynamicComponent>
            <FlipButtonGroup className="mb-2">
              {frontMatter?.examples.length > 1 && (
                <>
                  <FlipButton
                    id="variant-trigger"
                    label={`Variant: ${currentExample.title}`}
                    variant="flat"
                    icon="<flip-icon-expand-more></flip-icon-expand-more>"
                    iconPosition="end"
                  />
                  <FlipPopover
                    ref={variantPopover}
                    label="Variants"
                    popoverId="variant-trigger-popover"
                    trigger="variant-trigger"
                  >
                    <FlipActionList>
                      {frontMatter.examples.map((example) => (
                        <FlipActionListItem
                          size="m"
                          key={example.title}
                          label={example.title}
                          onClick={() => {
                            variantPopover.current.close();
                            handleExampleChange(example);
                            setIsLoading(true);
                          }}
                        ></FlipActionListItem>
                      ))}
                    </FlipActionList>
                  </FlipPopover>
                </>
              )}
            </FlipButtonGroup>
            <div className="w-full h-72 border-2 border-border-default rounded-lg">
              <IframeResizer
                className={classNames({ hidden: isLoading })}
                onLoad={() => setIsLoading(false)}
                src={currentExample.url}
                width="100%"
                height="100%"
              />
              <div
                className={classNames(
                  "flex justify-center items-center w-full h-full",
                  {
                    hidden: !isLoading,
                  }
                )}
              >
                <FlipSpinner />
              </div>
            </div>
          </DynamicComponent>
        )}
      </Suspense>
    </div>
  );
};
