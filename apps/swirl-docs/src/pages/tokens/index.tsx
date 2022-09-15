import {
  generateComponentsLinkList,
  generateDocumentationLinkList,
  generateLinkList,
} from "@swirl/lib/docs";
import { Link } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { DocCategory } from "@swirl/lib/docs/src/docs.model";

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
            sourcing from pages directroy
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
  links: Link[];
}> = async () => {
  const categoryDocs = generateDocumentationLinkList({
    name: "tokens",
    basePath: "tokens",
  });

  const links: Link[] = categoryDocs.subpages;

  console.log("links", categoryDocs);

  return {
    props: {
      links,
    },
  };
};

export default Components;
