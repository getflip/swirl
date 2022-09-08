import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import icon from "@getflip/swirl-icons/icons/Add16.svg";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

const Home: NextPage = ({ mdxSource, content }: any) => {
  return (
    <>
      <Head>
        <title>Swirl Docs</title>
        <meta name="description" content="Swirl Docs" />
      </Head>
      <main className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-6xl font-bold">NextJS Bootstrap with Tailwind</h1>
        <img src={icon.src} alt="add" />
      </main>

      <MDXRemote
        {...mdxSource}
        components={{
          h1: (props: any) => (
            <h2
              className="text-5xl font-bold"
              {...props}
              id={props.children.toLowerCase()}
            >
              {props.children}
            </h2>
          ),
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  mdxSource: MDXRemoteSerializeResult;
}> = async () => {
  const POST_PATH = path.join(process.cwd(), "src/posts", "test.mdx");
  const source = fs.readFileSync(POST_PATH, "utf8");

  const { content } = matter(source);

  const mdxSource = await serialize(content, { parseFrontmatter: true });
  return { props: { mdxSource, content } };
};

export default Home;
