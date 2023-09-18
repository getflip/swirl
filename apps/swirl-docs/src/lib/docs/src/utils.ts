import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import sectionize from "remark-sectionize";

export function serializeMarkdownString(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm, sectionize],
      format: "mdx",
    },
  });
}
