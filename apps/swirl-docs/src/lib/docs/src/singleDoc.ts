import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function generateMdxFromStorybook(
  componentPath: string
): Promise<
  MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
> {
  const source = fs.readFileSync(componentPath, "utf8");
  const matterSource = matter(source);

  const storyBookData = matterSource.content
    .split("\n")
    .filter((line) => {
      const isImportOrArgsTable =
        line.includes("import { ") ||
        line.includes("<ArgsTable") ||
        line.includes("<Meta") ||
        line.includes("<Canvas") ||
        line.includes("</Canvas") ||
        line.includes("<Story");
      return !isImportOrArgsTable;
    })
    .join("\n");

  const storyBookawait = serialize(storyBookData, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      format: "mdx",
    },
  });

  return storyBookawait;
}

export {};
