import { createContext, useContext } from "react";
import { CodePreview } from "./types";

const CodePreviewContext = createContext<CodePreview | null>(null);

export function useCodePreviewContext() {
  const context = useContext(CodePreviewContext);
  if (!context) {
    throw new Error(
      "CodePreview.* component must be rendered as child of the CodePreview component"
    );
  }
  return context;
}

export default CodePreviewContext;
