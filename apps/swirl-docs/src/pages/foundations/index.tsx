import Head from "next/head";
import { Card } from "src/components/Documentation/Card";

const FoundationsIndexPage = () => {
  return (
    <>
      <Head>
        <title>Swirl Foundations</title>
      </Head>
      <main id="main">
        <section className="flex flex-col justify-center items-center h-full w-screen">
          Foundations Index Page
          <div className="flex justify-between w-full p-8">
            <Card
              title="Do"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
              highlightColor="green"
              className="mr-4"
            />
            <Card
              title="Don't"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
              highlightColor="red"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default FoundationsIndexPage;
