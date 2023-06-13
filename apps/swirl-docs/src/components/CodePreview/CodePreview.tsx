import { useEffect, useState } from "react";
import { CodeSandboxButton } from "./CodeSandboxButton";
import classNames from "classnames";
import NoSsr from "../Layout/NoSsr";
import { CodePreview } from "./types";
import { NpmPackageLink } from "./NpmPackageLink";
import CodePreviewContext from "./CodePreviewContext";
import { APIEndpointHeader } from "./CodePreviewRequestString";
import { CodePreviewHeader } from "./CodePreviewHeader";
import { CodePreviewHighlight } from "./CodePreviewHighlight";
import { CodePreviewExpandButton } from "./CodePreviewExpandButton";

/**
 * Let's you easily render syntax highlighted code.
 */
export function CodePreview({
  codeExample,
  isLightTheme,
  hasCopyButton,
  className,
  PreviewIndicator,
  MainHeaderContent,
  ActionItems,
}: CodePreview) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectId, handleSelect] = useState<
    CodePreview["codeExample"]["selectId"]
  >(codeExample.selectId);

  const [codePreviewCodeExample, setCodeExample] = useState<
    CodePreview["codeExample"]
  >({
    code: codeExample.code,
    isLongCode: codeExample.isLongCode,
    selectId: selectId,
  });

  useEffect(() => {
    // TODO: Heads up: not the best solution for now. A global reducer would be better for the long run.
    if (codeExample) {
      setCodeExample({
        ...codeExample,
        code: codeExample.code,
        isLongCode: codeExample.code.split("\n").length > 7,
      });
    }
    if (codeExample.selectOptions && selectId) {
      setCodeExample({
        ...codeExample,
        selectId: selectId,
        code: codeExample.selectOptions[selectId],
        isLongCode: codeExample.selectOptions[selectId].split("\n").length > 7,
      });
    }
  }, [selectId, codeExample]);

  return (
    <NoSsr>
      <CodePreviewContext.Provider
        value={{
          isLightTheme,
          codeExample: codePreviewCodeExample,
          hasCopyButton,
          className,
          isExpanded,
          PreviewIndicator,
          MainHeaderContent,
          ActionItems,
          handleSelect,
        }}
      >
        <div
          className={classNames(
            className,
            "box-border relative max-w-full w-full rounded-xl",
            "p-2",
            {
              "md:h-[240px] md:max-h-[240px] overflow-hidden":
                !isExpanded && !isLightTheme,
              "min-h-[240px]": isExpanded,
              "h-full": isLightTheme,
            },
            {
              "bg-[#24292E]": !isLightTheme,
              "bg-surface-raised-default": isLightTheme,
            }
          )}
        >
          <CodePreviewHeader />
          <CodePreviewHighlight />
          {codePreviewCodeExample.isLongCode && !isLightTheme && (
            <CodePreviewExpandButton
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          )}
        </div>
      </CodePreviewContext.Provider>
    </NoSsr>
  );
}

CodePreview.CodeSandboxButton = CodeSandboxButton;
CodePreview.NpmPackageLink = NpmPackageLink;
CodePreview.EndpointHeader = APIEndpointHeader;
