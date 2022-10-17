import { createDocCategory } from "@swirl/lib/docs";
import { NavLink, NavItem, navItems } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import {
  BASE_PATHS,
  DocCategory,
  DOCUMENTATION_SRC,
} from "@swirl/lib/docs/src/docs.model";
import { CategoryNav } from "src/components/Layout/CategoryNav";
import Link from "next/link";

const RecursiveNavigation = (link: NavLink) => {
  const hasSubpages = link.subpages && link.subpages.length;
  return (
    <li className="list-disc">
      <Link href={link.path}>
        <a>{link.name}</a>
      </Link>
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
  const categoryLinks = navItems[1].children;
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <div className="flex min-h-[calc(100vh_-_72px)]">
        <CategoryNav categoryLinkList={categoryLinks} />
        <main id="main" className="w-full h-full">
          <section className="flex flex-col py-14 px-24">
            <h1 className="mb-4">Tokens</h1>
            <p className="mb-4">
              This is a directory of all tokens used in the Swirl Design System.
            </p>
            <nav aria-label="category links">
              <ul className="flex">
                {categoryLinks?.map((category: NavItem, index: number) => (
                  <li
                    className="border-1 rounded-lg p-4 mr-4 font-bold"
                    key={`${category.title}-${index}`}
                  >
                    <Link href={category.url!!}>
                      <a>{category.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  links: DocCategory[] | undefined;
}> = async () => {
  const categoryDocs = createDocCategory(
    {
      name: BASE_PATHS.TOKENS,
      basePath: BASE_PATHS.TOKENS,
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
