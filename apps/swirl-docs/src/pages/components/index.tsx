import { generateLinkList } from "@swirl/lib/docs";
import { generatePath, Link } from "@swirl/lib/navigation";
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
          Components
        </section>
        <nav>
          <ul className="list-disc">
            <RecursiveNavigation
              name="components"
              path="components"
              key={JSON.stringify(links)}
              subpages={links}
            />
          </ul>
        </nav>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  links: Link[];
}> = async () => {
  const categoryDocs = generateLinkList({
    name: "components",
    basePath: "components",
    isRoot: true,
  });

  const links: Link[] = categoryDocs.subpages;

  return {
    props: {
      links,
    },
  };
};

export default Components;
