import { NavItem } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { CategoryNav } from "src/components/Layout/CategoryNav";
import Link from "next/link";
import { tokensNavItems } from "@swirl/lib/navigation/src/data/tokens.data";

const Tokens = () => {
  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <div className="flex">
        <main id="main" className="w-full h-full">
          <section className="flex flex-col py-14 px-24">
            <h1 className="mb-4">Tokens</h1>
            <p className="mb-4">
              This is a directory of all tokens used in the Swirl Design System.
            </p>
            <nav aria-label="category links">
              <ul className="flex">
                {tokensNavItems?.map((category: NavItem, index: number) => (
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

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  };
};

export default Tokens;
