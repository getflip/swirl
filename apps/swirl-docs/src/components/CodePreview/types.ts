import { SupportedTargets } from "@readme/oas-to-snippet";
import { ApiEndpoint } from "@swirl/lib/docs";
import { Request } from "har-format";
import { ReactNode } from "react";

export type CodePreview = {
  codeExample: {
    code: string;
    isLongCode: boolean;
    snippets?: ApiEndpoint["request"]["snippets"];
    language?: SupportedTargets;
    request?: Request;
  };
  isExpanded?: boolean;
  isLightTheme?: boolean;
  hasCopyButton?: boolean;
  className?: string;
  PreviewIndicator?: ReactNode;
  MainHeaderContent?: ReactNode;
  ActionItems?: ReactNode;
  handleLangChange?: (lang: SupportedTargets) => void;
};
export type CodeExample = CodePreview["codeExample"];
