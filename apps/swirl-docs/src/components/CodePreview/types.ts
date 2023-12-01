import { ReactNode } from "react";
import { Request } from "har-format";

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
  disableHeader?: boolean;
  isLightTheme?: boolean;
  hasCopyButton?: boolean;
  className?: string;
  PreviewIndicator?: ReactNode;
  MainHeaderContent?: ReactNode;
  ActionItems?: ReactNode;
  handleSelect?: (value: string) => void;
};
export type CodeExample = CodePreview["codeExample"];
