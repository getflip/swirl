import {
  SwirlIconExpandLess,
  SwirlIconExpandMore,
} from "@getflip/swirl-components-react";
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

/**
 * Let's you easily render syntax highlighted code.
 * Children of the Component will be displayed in the Header.
 */
export function CodePreview({
  children,
  codeExample,
  isLightTheme,
  hasCopyButton,
  className,
}: CodePreview) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <NoSsr>
      <CodePreviewContext.Provider
        value={{
          isLightTheme,
          children,
          codeExample,
          hasCopyButton,
          className,
          isExpanded,
          setIsExpanded,
        }}
      >
        <div
          className={classNames(
            "relative w-auto rounded-xl overflow-auto",
            {
              "bg-[#24292E]": !isLightTheme,
              "bg-surface-raised-default": isLightTheme,
            },
            {
              "md:h-[240px] md:max-h-[240px] overflow-hidden":
                !isExpanded && !isLightTheme,
              "min-h-[240px]": isExpanded,
              "h-full": isLightTheme,
            },
            className
          )}
        >
          <CodePreviewHeader />
          <CodePreviewHighlight />
          {codeExample.isLongCode && !isLightTheme && (
            <CodePreviewExpandButton />
          )}
        </div>
      </CodePreviewContext.Provider>
    </NoSsr>
  );
}

CodePreview.CodeSandboxButton = CodeSandboxButton;
CodePreview.NpmPackageLink = NpmPackageLink;
CodePreview.EndpointHeader = APIEndpointHeader;
