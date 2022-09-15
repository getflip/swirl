import { createDocCategory } from "@swirl/lib/docs";
import { Link } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { DocCategory, DOCUMENTATION_SRC } from "@swirl/lib/docs/src/docs.model";

const RecursiveNavigation = (link: Link) => {
  const hasSubpages = link.subpages && link.subpages.length;
  return (
    <li className="list-disc">
      <a href={link.path}>{link.name}</a>
      {hasSubpages &&
        link.subpages?.map((item) => (
          <ul key={item.path}>
            <RecursiveNavigation key={item.name} {...item} />
          </ul>
        ))}
    </li>
  );
};

const Components = ({ links }: any) => {
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <main className="prose">
        <section className="flex flex-col justify-center items-center h-full w-screen">
          <h1>Tokens Directory</h1>
        </section>
        <section className="flex justify-center w-screen">
          <nav>
            sourcing from documentation directroy
            <ul className="list-disc">
              <RecursiveNavigation
                name="tokens"
                path="tokens"
                key={JSON.stringify(links)}
                subpages={links}
              />
            </ul>
          </nav>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  links: DocCategory[] | undefined;
}> = async () => {
  const categoryDocs = createDocCategory(
    {
      name: "tokens",
      basePath: "tokens",
    },
    DOCUMENTATION_SRC.DOCUMENTATION
  );

  const links: DocCategory[] | undefined = categoryDocs.subpages;

  console.log("links", categoryDocs);

  return {
    props: {
      links,
    },
  };
};

export default Components;
