import { generateSwirlComponentsPath } from "@swirl/lib/navigation";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function generateMdxFromStorybook(
  componentId: string
): Promise<
  MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
> {
  console.log("componentPath", componentId);
  const storyBookComponentId = `components-${componentId
    .split("-")
    .join("")}--${componentId}`;
  const iframeString = `
  <IframeResizer
    src="https://swirl-storybook.flip-app.dev/iframe.html?id=${storyBookComponentId}"
  ></IframeResizer>
  `;
  const source = fs.readFileSync(
    generateSwirlComponentsPath(componentId),
    "utf8"
  );
  const matterSource = matter(source);

  const storyBookData = matterSource.content
    .split("\n")
    .filter((line, index) => {
      if (line.includes("## Usage")) {
        console.log("line", line, index);
      }

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

  let usageIndex = 0;

  storyBookData
    .split("\n")
    .forEach((line: string, index: number) =>
      line.includes("## Usage") ? (usageIndex = index) : null
    );

  const storyBookSplit = storyBookData.split("\n");
  const newStoryBookString = [
    storyBookSplit.slice(0, usageIndex + 1).join("\n"),
    iframeString,
    storyBookSplit.slice(usageIndex + 1).join("\n"),
  ].join("\n");

  const storyBookawait = serialize(newStoryBookString, {
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
