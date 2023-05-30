import { SupportedTargets } from "@readme/oas-to-snippet";
import { Request } from "har-format";
import { Language } from "prism-react-renderer";
import { ReactNode } from "react";

export type CodePreview = {
  codeExample: {
    code: string;
    isLongCode: boolean;
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
};
export type CodeExample = CodePreview["codeExample"];
