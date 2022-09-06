import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Swirl Docs</title>
        <meta name="description" content="Swirl Docs" />
      </Head>
      <main className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-6xl font-bold">NextJS Bootstrap with Tailwind</h1>
      </main>
    </>
  );
};

export default Home;
