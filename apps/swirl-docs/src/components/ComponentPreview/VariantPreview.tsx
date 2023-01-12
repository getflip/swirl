import {
  SwirlActionList,
  SwirlActionListItem,
  SwirlButton,
  SwirlButtonGroup,
  SwirlPopover,
  SwirlSpinner,
} from "@getflip/swirl-components-react";
import { ComponentExample, FrontMatter } from "@swirl/lib/docs/src/docs.model";
import classNames from "classnames";
import IframeResizer from "iframe-resizer-react";
import { FunctionComponent, Suspense, useRef } from "react";
import DynamicComponent from "./DynamicComponent";

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
            <SwirlButtonGroup className="mb-2">
              {frontMatter?.examples.length > 1 && (
                <>
                  <SwirlButton
                    id="variant-trigger"
                    label={`Variant: ${currentExample.title}`}
                    variant="flat"
                    icon="<swirl-icon-expand-more></swirl-icon-expand-more>"
                    iconPosition="end"
                  />
                  <SwirlPopover
                    ref={variantPopover}
                    label="Variants"
                    popoverId="variant-trigger-popover"
                    trigger="variant-trigger"
                  >
                    <SwirlActionList>
                      {frontMatter.examples.map((example) => (
                        <SwirlActionListItem
                          size="m"
                          key={example.title}
                          label={example.title}
                          onClick={() => {
                            variantPopover.current.close();
                            handleExampleChange(example);
                            setIsLoading(true);
                          }}
                        ></SwirlActionListItem>
                      ))}
                    </SwirlActionList>
                  </SwirlPopover>
                </>
              )}
            </SwirlButtonGroup>
            <div className="w-full h-72 border-2 border-border-default rounded-lg">
              <IframeResizer
                aria-label="Component preview"
                className={classNames("min-h-full", { hidden: isLoading })}
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
                <SwirlSpinner />
              </div>
            </div>
          </DynamicComponent>
        )}
      </Suspense>
    </div>
  );
};
