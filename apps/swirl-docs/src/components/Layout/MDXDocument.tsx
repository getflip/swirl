import { MDXRemote } from "next-mdx-remote";
import { useDocumentationLayoutContext } from "./DocumentationLayoutContext";

export function MDXDocument() {
  const { mdxContent } = useDocumentationLayoutContext();

  return (
    <MDXRemote {...mdxContent.document} components={mdxContent.components} />
  );
}

export default MDXDocument;
