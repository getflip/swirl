import { useState } from "react";
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
import { oasToSnippet } from "@readme/oas-to-snippet";

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
  const [language, setLanguage] =
    useState<CodePreview["codeExample"]["language"]>("shell");

  const [codePreviewCodeExample, setCodeExample] = useState<
    CodePreview["codeExample"]
  >({
    ...codeExample,
  });

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
          {codeExample.isLongCode && !isLightTheme && (
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
