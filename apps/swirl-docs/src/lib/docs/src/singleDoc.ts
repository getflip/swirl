import fs from "fs";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { generateDocumentPath } from "@swirl/lib/navigation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import sectionize from "remark-sectionize";
import { ApiDocumentation, DocumentationCategory } from "./docs.model";
import path from "path";

export async function generateMdxFromDocumentation(
  category: DocumentationCategory,
  document: string
): Promise<MDXRemoteSerializeResult> {
  console.log("generateMdxFromDocumentation", category, document);

  // Derive the full path
  const fullPath = path.resolve(__dirname, document);

  // Ensure that the document path is not a directory
  if (fs.existsSync(fullPath) && !fs.lstatSync(fullPath).isDirectory()) {
    const source = fs.readFileSync(
      generateDocumentPath(category, document),
      "utf8"
    );

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
