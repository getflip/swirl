import { NavItem } from "@swirl/lib/navigation";
import { componentsNavItems } from "@swirl/lib/navigation/src/data/components.data";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import ComponentGrid from "src/components/Components/ComponentGrid";
import { CategoryNav } from "src/components/Layout/CategoryNav";

type Usage = "app" | "admin";

export type IconData = {
  id: string;
  name: string;
  description: string;
  usage: Usage[];
  keywords: string[];
};

export type IconsMetaData = {
  [key: string]: IconData;
};

const ComponentsIndex = ({ links }: { links: NavItem[] }) => {
  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>
      <div className="flex">
        <CategoryNav categoryLinkList={links} />
        <main
          id="main"
          className="w-full h-full mt-14 flex flex-col px-4 md:px-24"
        >
          <header className="mb-16 max-w-xl pb-10 md:pb-7 border-b-1">
            <h1 className="text-4xl text-text-default mb-4">Components</h1>
            <p className="text-lg leading-line-height-xl text-text-default">
              Sed cras pretium augue at. Placerat risus congue aliquet nec
              aliquet ipsum ac. Id magna donec habitant nulla nibh sem vitae
              eget enim. Feugiat erat eget feugiat viverra aliquam.
            </p>
          </header>
          <div className="flex w-full">
            <div className="w-full md:mr-8">
              <ComponentGrid
                componentList={componentsNavItems
                  .map((item) => item)
                  .filter((item) => item.title !== "Overview")}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {
      links: componentsNavItems,
    },
  };
};

export default ComponentsIndex;
