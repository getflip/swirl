import { SupportedTargets } from "@readme/oas-to-snippet";
import { Request } from "har-format";
import { Language } from "prism-react-renderer";

export type CodeExample = {
  code: string;
  isLongCode: boolean;
  language?: Language;
  request?: Request;
};
