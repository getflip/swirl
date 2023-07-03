import { SwirlIconArrowRight } from "@getflip/swirl-components-react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "src/components/Layout/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Flip & Swirl Developer Docs</title>
      </Head>

      <div className="flex flex-col items-center h-[calc(100vh_-_72px)] md:px-space-16">
        <main id="main" className="grow w-full max-w-[90rem]">
          <header className="bg-surface-info-subdued flex items-center md:h-[28.75rem] md:rounded-b-[1.5rem] mb-space-48 md:mb-space-64 px-space-16 py-space-32">
            <div className="flex flex-col md:flex-row md:items-center w-full gap-4 justify-between md:max-w-[50rem] mx-auto">
              <div className="basis-0 grow max-w-[22.5rem]">
                <h1 className="font-bold text-[2.5rem] mb-space-8">
                  Build with Flip
                </h1>
                <p className="text-font-size-lg text-text-subdued mb-space-24">
                  Flip developer APIs and Swirl provide everything you need to
                  integrate your app seamless into Flip
                </p>
                <Link href="/api-docs/public-post-api">
                  <a className="inline-flex bg-action-primary-default hover:bg-action-primary-hovered text-font-size-sm text-text-on-action-primary px-space-12 py-space-8 font-medium rounded-border-radius-sm">
                    Explore APIs
                  </a>
                </Link>
              </div>
              <div className="hidden md:inline-flex justify-end basis-0 grow text-right">
                <Image alt="" height="240" src="/images/home.svg" width="360" />
              </div>
            </div>
          </header>

          <section className="px-space-16">
            <div className="max-w-[50rem] mx-auto">
              <h2 className="text-font-size-lg mb-space-16">Get started</h2>
              <div className="flex gap-space-24 flex-wrap items-stretch">
                <article className="relative flex flex-col min-[400px]:basis-[calc(100%_/_2_-_1.5rem_/_2)] sm:basis-[calc(100%_/_3_-_1.5rem_/_3_*_2)]">
                  <div className="flex items-center justify-center aspect-[3/2] mb-space-12 bg-surface-raised-default rounded-border-radius-base">
                    <Image
                      alt=""
                      height="32"
                      src="/images/teaser-icon-api.svg"
                      width="32"
                    />
                  </div>
                  <h3 className="text-font-size-base font-semibold">APIs</h3>
                  <p className="text-font-size-sm mb-space-8 grow">
                    The FlipAvatar component is used to represent a user via an
                    image, icon or initials.
                  </p>
                  <Link href="/api-docs/public-post-api">
                    <a className="inline-flex items-center gap-space-4 text-font-size-sm font-medium text-interactive-primary-default hover:text-interactive-primary-hovered">
                      Get started{" "}
                      <span className="sr-only">with Flip APIs</span>
                      <SwirlIconArrowRight size={20} />
                    </a>
                  </Link>
                </article>
                <article className="relative flex flex-col min-[400px]:basis-[calc(100%_/_2_-_1.5rem_/_2)] sm:basis-[calc(100%_/_3_-_1.5rem_/_3_*_2)]">
                  <div className="flex items-center justify-center aspect-[3/2] mb-space-12 bg-surface-raised-default rounded-border-radius-base">
                    <Image
                      alt=""
                      height="32"
                      src="/images/teaser-icon-tokens.svg"
                      width="32"
                    />
                  </div>
                  <h3 className="text-font-size-base font-semibold">Tokens</h3>
                  <p className="text-font-size-sm mb-space-8 grow">
                    Consistent variables defining visual elements, ensuring
                    harmony across platforms.
                  </p>
                  <Link href="/icons">
                    <a className="inline-flex items-center gap-space-4 text-font-size-sm font-medium text-interactive-primary-default hover:text-interactive-primary-hovered">
                      Get started{" "}
                      <span className="sr-only">with Flip Tokens</span>
                      <SwirlIconArrowRight size={20} />
                    </a>
                  </Link>
                </article>
                <article className="relative flex flex-col min-[400px]:basis-[calc(100%_/_2_-_1.5rem_/_2)] sm:basis-[calc(100%_/_3_-_1.5rem_/_3_*_2)]">
                  <div className="flex items-center justify-center aspect-[3/2] mb-space-12 bg-surface-raised-default rounded-border-radius-base">
                    <Image
                      alt=""
                      height="32"
                      src="/images/teaser-icon-icons.svg"
                      width="32"
                    />
                  </div>
                  <h3 className="text-font-size-base font-semibold">Icons</h3>
                  <p className="text-font-size-sm mb-space-8 grow">
                    A collection of chosen material design and custom icons.
                  </p>
                  <Link href="/tokens/color">
                    <a className="inline-flex items-center gap-space-4 text-font-size-sm font-medium text-interactive-primary-default hover:text-interactive-primary-hovered">
                      Get started{" "}
                      <span className="sr-only">with Flip Icons</span>
                      <SwirlIconArrowRight size={20} />
                    </a>
                  </Link>
                </article>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

export default Home;
