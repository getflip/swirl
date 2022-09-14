import { generateComponentsLinkList, generateLinkList } from "@swirl/lib/docs";
import { Link } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { generateMdxFromStorybook } from "@swirl/lib/docs/src/singleDoc";
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

const Components = ({ links, swirlComponentLinks }: any) => {
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <main className="prose">
        <section className="flex flex-col justify-center items-center h-full w-screen">
          Components
        </section>
        <section className="flex justify-center w-screen">
          <nav>
            sourcing from pages directroy
            <ul className="list-disc">
              <RecursiveNavigation
                name="components"
                path="components"
                key={JSON.stringify(links)}
                subpages={links}
              />
            </ul>
          </nav>
          <nav>
            sourcing from components within storybook project
            <ul className="list-disc">
              {swirlComponentLinks.map((component: DocCategory) => {
                return (
                  <li key={component.path}>
                    <a href={component.nextRoute}>{component.name}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  links: Link[];
  swirlComponentLinks: DocCategory[];
}> = async () => {
  const swirlComponentLinks = generateComponentsLinkList("components");

  const categoryDocs = generateLinkList({
    name: "components",
    basePath: "components",
  });

  const links: Link[] = categoryDocs.subpages;

  return {
    props: {
      links,
      swirlComponentLinks,
    },
  };
};

export default Components;
