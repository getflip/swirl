import { createDocCategory } from "@swirl/lib/docs";
import {
  BASE_PATHS,
  DocCategory,
  DOCUMENTATION_SRC,
} from "@swirl/lib/docs/src/docs.model";
import { Link, NavItem, navItems } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { CategoryNav } from "src/components/Layout/CategoryNav";

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
  const categoryLinks: NavItem[] = [
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
  ];
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <div className="flex min-h-[calc(100vh_-_72px)]">
        <CategoryNav categoryLinkList={categoryLinks} />
        <main className="w-full h-full">
          <section className="flex flex-col py-14 px-24">
            <div>
              <h1 className="mb-4">Icons</h1>
              <p className="mb-4">here will be a searchbar</p>
            </div>
            <div>
              <h2 className="mb-4">Icon List</h2>
              <nav>
                <ul className="flex flex-wrap">
                  {categoryLinks?.map((category: NavItem, index: number) => (
                    <li
                      className="basis-1/6 flex flex-col justify-center items-center border-1 rounded-lg min-w-[10rem] max-w-[10rem] min-h-[10rem] mr-4 mb-4 last:mr-0 last:mb-0"
                      key={`${category.title}-${index}`}
                    >
                      <div>Icon Image</div>
                      <div>Icon Name</div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
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
