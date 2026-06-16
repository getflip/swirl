import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import Footer from "src/components/Layout/Footer";

const HUBSPOT_PORTAL_ID = "7401529";
const HUBSPOT_FORM_ID = "dc9a2f37-708d-4d31-902e-e0607c744916";
const HUBSPOT_REGION = "na1";

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (opts: {
          portalId: string;
          formId: string;
          target: string;
          region?: string;
        }) => void;
      };
    };
  }
}

const TARGET_ID = "hubspotForm";

const Newsletter: NextPage = () => {
  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const mount = () => {
      const target = document.getElementById(TARGET_ID);
      if (!target) return false;
      target.innerHTML = "";
      window.hbspt.forms.create({
        portalId: HUBSPOT_PORTAL_ID,
        formId: HUBSPOT_FORM_ID,
        region: HUBSPOT_REGION,
        target: `#${TARGET_ID}`,
      });
      return true;
    };

    if (window.hbspt?.forms?.create) {
      mount();
    } else {
      intervalId = setInterval(() => {
        if (cancelled) return;
        if (window.hbspt?.forms?.create && mount()) {
          clearInterval(intervalId);
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      const target = document.getElementById(TARGET_ID);
      if (target) target.innerHTML = "";
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Subscribe to the Flip Developer Newsletter — getflip.dev
        </title>
        <meta
          name="description"
          content="Get product updates, API changes, and engineering deep-dives from the Flip developer team delivered to your inbox."
        />
      </Head>

      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
      />

      <div className="flex flex-col items-center h-[calc(100vh_-_72px)] md:px-space-16 overflow-auto">
        <main id="main" className="grow w-full max-w-[90rem] pb-space-64">
          <header className="bg-surface-info-subdued flex items-center md:h-[20rem] md:rounded-b-[1.5rem] mb-16 md:mb-space-64 px-space-16 py-space-32">
            <div className="flex flex-col w-full gap-4 md:max-w-[50rem] mx-auto">
              <h1 className="font-bold text-[2.5rem] mb-space-8">
                Subscribe to our developer newsletter
              </h1>
              <p className="text-font-size-lg text-text-on-surface-highlight-subdued">
                Stay up to date on platform and API changes as well as the latest integration guides.
                Straight to your inbox. Low volume, no spam.
              </p>
            </div>
          </header>

          <section
            aria-labelledby="heading-subscribe"
            className="px-space-16"
          >
            <div className="max-w-[40rem] mx-auto">
              <h2
                id="heading-subscribe"
                className="text-font-size-lg mb-space-16"
              >
                Sign up
              </h2>
              <div id={TARGET_ID} />
            </div>
          </section>
        </main>

        <div className="max-w-[90rem] w-full mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

export default Newsletter;
