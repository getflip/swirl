import { Request } from "har-format";
import { Language } from "prism-react-renderer";
import { ReactNode } from "react";

export type CodePreview = {
  codeExample: {
    code: string;
    isLongCode: boolean;
    language?: Language;
    request?: Request;
  };
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  isLightTheme?: boolean;
  hasCopyButton?: boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
};
