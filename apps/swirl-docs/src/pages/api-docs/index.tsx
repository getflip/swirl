import { ApiDocumentationsFacade } from "@swirl/lib/docs/src/ApiDocumentationsFacade";
import { NavItem } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";

const ApiDocs = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <>
      <Head>
        <title>API Docs</title>
      </Head>
      <DocumentationLayout
        data={{
          navigationLinks: navItems,
        }}
        content={
          <div className="flex">
            <main id="main" className="w-full h-full">
              <section className="flex flex-col py-14 px-24">
                <h1 className="mb-4">API Docs</h1>
                <p>Currently working on it</p>
              </section>
            </main>
          </div>
        }
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  const navItems = await ApiDocumentationsFacade.navItems;

  return {
    props: {
      navItems,
    },
  };
};

export default ApiDocs;
