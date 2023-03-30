import fs from "fs";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { generateDocumentPath } from "@swirl/lib/navigation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import sectionize from "remark-sectionize";
import { DocumentationCategory } from "./docs.model";

export async function generateMdxFromDocumentation(
  category: DocumentationCategory,
  document: string
): Promise<
  MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
> {
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
}

export function serializeMarkdownString(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      remarkPlugins: [remarkGfm, sectionize],
      format: "mdx",
    },
  });
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
