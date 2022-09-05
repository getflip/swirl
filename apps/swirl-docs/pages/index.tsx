import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <h2 className="text-5xl font-bold underline on-surface-1">
        tailwind test
      </h2>
      <p className="text-5xl text-icon-success">hello default</p>
      <p className="text-5xl text-icon-success-light">hello light</p>
      <p className="text-5xl text-icon-success-dark">hello dark</p>
    </>
  );
};

export default Home;
