import { generateSwirlComponentsPath } from "@swirl/lib/navigation";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { DocHeadline } from "./docs.model";

function generateSerializableString(componentId: string) {
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
  return [
    storyBookSplit.slice(0, usageIndex + 1).join("\n"),
    iframeString,
    storyBookSplit.slice(usageIndex + 1).join("\n"),
  ].join("\n");
}

export async function generateMdxFromStorybook(
  componentId: string
): Promise<
  MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
> {
  const source = generateSerializableString(componentId);

  const storyBookawait = serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      format: "mdx",
    },
  });

  return storyBookawait;
}

const HeadingMap = new Map<string, number>([
  ["#", 1],
  ["##", 2],
  ["###", 3],
  ["####", 4],
  ["#####", 5],
  ["######", 6],
]);

export function createDocLinkList(componentId: string): DocHeadline[] {
  const source = generateSerializableString(componentId);
  const headlines = source.split("\n").filter((line) => line.startsWith("#"));

  return headlines.map((headline) => {
    const headlineId = headline
      .split(" ")[1]
      .toLowerCase()
      .split(" ")
      .join("-");
    const headlineLevel = HeadingMap.get(headline.split(" ")[0]);

    return {
      id: headlineId,
      name: headline.split(" ")[1],
      level: headlineLevel,
    };
  });
}
