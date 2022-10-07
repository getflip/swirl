import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({}: any) => {
  return (
    <>
      <Head>
        <title>Swirl | NextJS Bootstrap</title>
      </Head>
      <main className="flex flex-col justify-center items-center h-[calc(100vh_-_72px)] w-screen">
        <h1 className="text-3xl font-bold max-w-lg text-center">
          getflip.dev is the future 🏠 of our developer docs for our APIs and
          Swirl 🌀 our Design System.
        </h1>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

export default Home;
