import { createDocCategory } from "@swirl/lib/docs";
import {
  BASE_PATHS,
  DocCategory,
  DOCUMENTATION_SRC,
} from "@swirl/lib/docs/src/docs.model";
import { Link } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";

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
          <h1>icons Directory</h1>
        </section>
        <section className="flex justify-center w-screen">
          <nav>
            sourcing from pages directroy
            <ul className="list-disc">
              <RecursiveNavigation
                name={BASE_PATHS.ICONS}
                path={BASE_PATHS.ICONS}
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
      name: BASE_PATHS.ICONS,
      basePath: BASE_PATHS.ICONS,
    },
    DOCUMENTATION_SRC.DOCUMENTATION
  );

  const links: DocCategory[] | undefined = categoryDocs.subpages;

  return {
    props: {
      links,
    },
  };
};

export default Components;
