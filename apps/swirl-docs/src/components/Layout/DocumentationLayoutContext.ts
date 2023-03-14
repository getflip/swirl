import { FrontMatter } from "@swirl/lib/docs";
import { NavItem } from "@swirl/lib/navigation";
import { OASDocument } from "oas/dist/rmoas.types";
import { createContext, useContext } from "react";

export type TDocumentationLayout = {
  mdxContent: {
    document?: any;
    mdxComponents?: any;
  };
  navigationLinks?: NavItem[];
  frontMatter?: FrontMatter;
  oasSpec?: OASDocument;
};

const DocumentationLayoutContext = createContext<TDocumentationLayout | null>(
  null
);

export function useDocumentationLayoutContext() {
  const context = useContext(DocumentationLayoutContext);

  if (!context) {
    throw new Error(
      "DocumentationLayout.* component must be rendered as a child of DocumentationLayout"
    );
  }

  return context;
}

export default DocumentationLayoutContext;
