import type { NextPage } from "next";
import Head from "next/head";
import icon from "@getflip/swirl-icons/icons/Add16.svg";

const Home: NextPage = () => {
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
    </>
  );
};

export default Home;
