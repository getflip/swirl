import { MDXRemote } from "next-mdx-remote";
import { useDocumentationLayoutContext } from "./DocumentationLayoutContext";

export function MDXDocument() {
  const { mdxContent } = useDocumentationLayoutContext();

  if (!mdxContent) {
    return null;
  }

  return (
    <MDXRemote {...mdxContent?.document} components={mdxContent?.components} />
  );
}

export default MDXDocument;
