import { DocumentationCategory } from "./docs.model";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import { generateDocumentPath } from "@swirl/lib/navigation";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import sectionize from "remark-sectionize";
import { serialize } from "next-mdx-remote/serialize";

export async function generateMdxFromDocumentation(
  category: DocumentationCategory,
  document: string
): Promise<MDXRemoteSerializeResult> {
  const fullPath = generateDocumentPath(category, document); // Derive the full path

  // Ensure that the document path is not a directory
  if (fs.existsSync(fullPath) && !fs.lstatSync(fullPath).isDirectory()) {
    const source = fs.readFileSync(fullPath, "utf8");

    const serializeAwait = serialize(source, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        remarkPlugins: [remarkGfm, sectionize],
        format: "mdx",
      },
    });

    return serializeAwait;
  } else {
    console.log(`${document} is a directory, not an .mdx file`);
    const serializeAwait = serialize("# DIRECTORY", {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        remarkPlugins: [remarkGfm, sectionize],
        format: "mdx",
      },
    });

    return serializeAwait;
  }
}

export function generateSerializableDocumentation(
  category: DocumentationCategory,
  document: string
): matter.GrayMatterFile<string> {
  const source = fs.readFileSync(
    generateDocumentPath(category, document),
    "utf8"
  );
  return matter(source);
}
