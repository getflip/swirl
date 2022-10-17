import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({}: any) => {
  return (
    <>
      <Head>
        <title>Swirl | NextJS Bootstrap</title>
      </Head>
      <main
        id="main"
        className="flex flex-col justify-center items-center h-[calc(100vh_-_72px)] w-screen"
      >
        <h1 className="text-3xl font-bold max-w-lg text-center">
          Here arise the{" "}
          <a
            className="text-border-info hover:underline"
            target="__blank"
            href="https://www.flipapp.de/en/"
          >
            <b>Flip</b>
          </a>{" "}
          <i>developer docs</i> and the design system docs for{" "}
          <code>swirl</code> 🌀.
        </h1>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

export default Home;
