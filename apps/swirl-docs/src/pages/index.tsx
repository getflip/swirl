import { isProdDeployment } from "@swirl/lib/env";
import { NavItem, navItems } from "@swirl/lib/navigation";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "src/components/Layout/Footer";
import GetStartedLink from "src/components/Layout/GetStartedLink";
import { Tag } from "src/components/Tags";

const Home: NextPage = () => {
  const mainItems = navItems.filter((navItem) => !navItem.devOnly);
  const comingSoonItems = navItems.filter((navItem) => navItem.devOnly);

  return (
    <>
      <Head>
        <title>Flip & Swirl Developer Docs</title>
      </Head>

      <div className="flex flex-col items-center h-[calc(100vh_-_72px)] md:px-space-16 overflow-auto">
        <main id="main" className="grow w-full max-w-[90rem] pb-space-64">
          <header className="bg-surface-info-subdued flex items-center md:h-[28.75rem] md:rounded-b-[1.5rem] mb-16 md:mb-space-64 px-space-16 py-space-32">
            <div className="flex flex-col md:flex-row md:items-center w-full gap-4 justify-between md:max-w-[50rem] mx-auto">
              <div className="basis-0 grow max-w-[22.5rem]">
                <h1 className="font-bold text-[2.5rem] mb-space-8">
                  Build with Flip
                </h1>
                <p className="text-font-size-lg text-text-on-surface-highlight-subdued mb-space-24">
                  Design, build, and deliver improved experiences for the
                  blue-collar world using the Swirl design system and Flip APIs.
                </p>
                <Link
                  href="/tokens/color"
                  className="inline-flex bg-action-primary-default hover:bg-action-primary-hovered text-font-size-sm text-text-on-action-primary px-space-12 py-space-8 font-medium rounded-border-radius-sm"
                >
                  Explore Tokens
                </Link>
              </div>
              <div className="hidden md:inline-flex justify-end basis-0 grow text-right">
                <Image alt="" height="240" src="/images/home.svg" width="360" />
              </div>
            </div>
          </header>

          <section
            aria-labelledby="heading-get-started"
            className="px-space-16 mb-10"
          >
            <div className="max-w-[50rem] mx-auto">
              <h2
                id="heading-get-started"
                className="text-font-size-lg mb-space-16"
              >
                Get started
              </h2>

              <div className="flex gap-space-24 flex-wrap items-stretch">
                {mainItems.map((navItem) => (
                  <HomeTile navItem={navItem} key={navItem.url} />
                ))}
              </div>
            </div>
          </section>

          {comingSoonItems.length > 0 && (
            <section
              aria-labelledby="heading-coming-soon"
              className="px-space-16"
            >
              <div className="max-w-[50rem] mx-auto">
                <h2
                  id="heading-coming-soon"
                  className="text-font-size-lg mb-space-16"
                >
                  Coming soon
                </h2>

                <div className="flex gap-space-24 flex-wrap items-stretch">
                  {comingSoonItems.map((navItem) => (
                    <HomeTile navItem={navItem} key={navItem.url} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <div className="max-w-[90rem] w-full mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

const HomeTile = ({ navItem }: { navItem: NavItem }) => {
  const headerId = `heading-${navItem.url})`;

  const isComingSoon = navItem.devOnly && isProdDeployment;

  return (
    <article
      key={navItem.url}
      aria-labelledby={headerId}
      className="group relative flex flex-col min-[400px]:basis-[calc(100%_/_2_-_1.5rem_/_2)] sm:basis-[calc(100%_/_3_-_1.5rem_/_3_*_2)]"
    >
      <div className="flex items-center justify-center aspect-[3/2] mb-space-12 bg-surface-raised-default rounded-border-radius-base">
        {navItem.teaserIcon && (
          <Image alt="" height="32" src={navItem.teaserIcon} width="32" />
        )}
      </div>
      <h3
        id={headerId}
        className="text-font-size-base font-semibold flex justify-between items-start"
      >
        {navItem.title}
        {navItem.devOnly && !isComingSoon && (
          <Tag scheme="warning" content="dev" />
        )}
      </h3>
      <p className="text-font-size-sm mb-space-8 grow">{navItem.description}</p>
      {navItem.url && !isComingSoon && <GetStartedLink />}
      {navItem.url && !isComingSoon && (
        <Link
          href={navItem.url}
          aria-label={"Get started with " + navItem.title}
          className="absolute inset-0"
        ></Link>
      )}
    </article>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

export default Home;
