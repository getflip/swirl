import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import remarkGfm from "remark-gfm";

const Home: NextPage = ({ mdxSource, storyBookSource, data }: any) => {
  console.log(data);

  const url = `https://swirl-storybook.flip-app.dev/iframe.html?args=type:button&id=${data.component_id}&viewMode=story`;

  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-6xl font-bold">
          Storybook Doc dynamically sourced 🚀 {data.title}
        </h1>
      </main>

      <section className="flex flex-col justify-center items-center h-full w-screen">
        <div className="prose">
          <iframe src={url} />
          <MDXRemote {...storyBookSource} />
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  mdxSource: MDXRemoteSerializeResult;
  storyBookSource: MDXRemoteSerializeResult;
}> = async () => {
  const buttonTest =
    "packages/swirl-components/src/components/flip-button/flip-button.mdx";
  const BUTTON_TEST_PATH = path.join(process.cwd(), `../../${buttonTest}`);

  const POST_PATH = path.join(process.cwd(), "src/posts", "test.mdx");
  const workingSource = fs.readFileSync(POST_PATH, "utf8");

  const { content } = matter(workingSource);

  const source = fs.readFileSync(BUTTON_TEST_PATH, "utf8");
  const data = matter(source);

  const frontMatter = data.data;

  const storyBookData = data.content
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

  const storyBookSource = await serialize(storyBookData, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      format: "mdx",
    },
  });

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      format: "mdx",
    },
  });
  return { props: { mdxSource, storyBookSource, data: frontMatter } };
};

export default Home;
