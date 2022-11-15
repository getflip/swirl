import Head from "next/head";
import { GetStaticProps } from "next/types";

const Components = () => {
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <section className="flex justify-center w-screen">
        swirl components
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  };
};

export default Components;
