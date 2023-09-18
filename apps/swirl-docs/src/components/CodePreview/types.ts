import { Request } from "har-format";
import { ReactNode } from "react";

export type CodePreviewSelectOptions = Record<string, string>;

export type CodePreview = {
  codeExample: {
    code: string;
    isLongCode: boolean;
    selectedId?: string;
    selectOptions?: CodePreviewSelectOptions;
    status?: string;
    request?: Request;
  };
  isExpanded?: boolean;
  isLightTheme?: boolean;
  hasCopyButton?: boolean;
  className?: string;
  PreviewIndicator?: ReactNode;
  MainHeaderContent?: ReactNode;
  ActionItems?: ReactNode;
  handleSelect?: (value: string) => void;
};
export type CodeExample = CodePreview["codeExample"];
