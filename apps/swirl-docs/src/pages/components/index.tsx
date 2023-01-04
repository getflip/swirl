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
        <main id="main" className="w-full h-full">
          <section className="flex flex-col px-4 md:py-14 md:px-24">
            <div className="mb-16 max-w-xl">
              <h1 className="mb-4">Components</h1>
              <h4>
                Sed cras pretium augue at. Placerat risus congue aliquet nec
                aliquet ipsum ac. Id magna donec habitant nulla nibh sem vitae
                eget enim. Feugiat erat eget feugiat viverra aliquam.
              </h4>
            </div>
            <div className="flex w-full">
              <div className="w-full md:mr-8">
                <h2 className="mb-4">Component List</h2>
                <ComponentGrid
                  componentList={componentsNavItems
                    .map((item) => item)
                    .filter((item) => item.title !== "Overview")}
                />
              </div>
            </div>
          </section>
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
