import { createContext, useContext } from "react";
import { CodeExample } from "./types";

const CodePreviewContext = createContext<{ product: CodeExample } | null>(null);

export function useCodePreviewContext() {
  const context = useContext(CodePreviewContext);
  if (!context) {
    throw new Error(
      "CodePreview.* component must be rendered as child of CodePreview component"
    );
  }
  return context;
}

export default CodePreviewContext;
