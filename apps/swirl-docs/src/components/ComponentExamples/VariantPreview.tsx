import {
  FlipActionList,
  FlipActionListItem,
  FlipButton,
  FlipButtonGroup,
  FlipPopover,
  FlipSpinner,
} from "@getflip/swirl-components-react";
import classNames from "classnames";
import IframeResizer from "iframe-resizer-react";
import { FunctionComponent, useRef, useState } from "react";
import { ComponentExample, FrontMatter } from "../Layout/DocumentationLayout";
import NoSsr from "../Layout/NoSsr";

interface VariantPreviewProps {
  frontMatter: FrontMatter;
}

export const VariantPreview: FunctionComponent<VariantPreviewProps> = ({
  frontMatter,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentExample, setCurrentExample] = useState<ComponentExample>(
    frontMatter.examples[0]
  );
  const variantPopover = useRef<any>(null);
  return (
    <div className="mb-12">
      <h2 className="text-2xl text-text-default mb-4">Variants</h2>
      <p className="text-lg text-text-default mb-12">
        {frontMatter?.variantsDescription}
      </p>
      <NoSsr>
        <FlipButtonGroup className="mb-2">
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
                    setCurrentExample(example);
                    setIsLoading(true);
                  }}
                ></FlipActionListItem>
              ))}
            </FlipActionList>
          </FlipPopover>
          <FlipButton
            id="theme-trigger"
            label="Theme"
            variant="flat"
            icon="<flip-icon-expand-more></flip-icon-expand-more>"
            iconPosition="end"
          />
          <FlipPopover
            label="Themes"
            popoverId="theme-trigger-popover"
            trigger="theme-trigger"
          >
            <FlipActionList>
              <FlipActionListItem label="Hello World"></FlipActionListItem>
            </FlipActionList>
          </FlipPopover>
          <FlipButton label="View RTL" variant="flat"></FlipButton>
        </FlipButtonGroup>
        <div className="w-full h-72 border-2 border-border-default rounded-lg">
          <IframeResizer
            className={classNames({ hidden: isLoading })}
            onLoad={() => setIsLoading(false)}
            src={currentExample.url}
            width="100%"
            height="100%"
            onMouseEnter={(data) => console.log(data)}
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
      </NoSsr>
    </div>
  );
};
