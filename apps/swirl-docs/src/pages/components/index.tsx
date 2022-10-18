import {
  createSwirlComponentDocCategories,
  createDocCategory,
} from "@swirl/lib/docs";
import { NavLink } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import {
  BASE_PATHS,
  DocCategory,
  DOCUMENTATION_SRC,
} from "@swirl/lib/docs/src/docs.model";
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

const Components = ({ links, swirlComponentLinks }: any) => {
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <section className="flex justify-center w-screen">
        <nav aria-label="swirl component links">
          <ul className="list-disc">
            {swirlComponentLinks.map((component: DocCategory) => {
              return (
                <li key={component.path}>
                  <Link href={component.nextRoute!!}>
                    <a>{component.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  links: DocCategory[] | undefined;
  swirlComponentLinks: DocCategory[];
}> = async () => {
  const swirlComponentLinks = createSwirlComponentDocCategories(
    BASE_PATHS.COMPONENTS
  );

  const categoryDocs = createDocCategory(
    {
      name: BASE_PATHS.COMPONENTS,
      basePath: BASE_PATHS.COMPONENTS,
    },
    DOCUMENTATION_SRC.PAGES
  );

  const links: DocCategory[] | undefined = categoryDocs.subpages;

  return {
    props: {
      links,
      swirlComponentLinks,
    },
  };
};

export default Components;
