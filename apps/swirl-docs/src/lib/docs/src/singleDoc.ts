import fs from "fs";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { generateDocumentPath } from "@swirl/lib/navigation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
const sectionize = require("remark-sectionize");

export async function generateMdxFromDocumentation(
  category: string,
  document: string
): Promise<
  MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
> {
  // const source = generateSerializableDocumentation(category, document);

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

export function generateSerializableDocumentation(
  category: string,
  document: string
) {
  const source = fs.readFileSync(
    generateDocumentPath(category, document),
    "utf8"
  );
  const matterSource = matter(source);

  return matterSource.content;
}
