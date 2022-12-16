import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Layout from "src/components/Layout";
import "@getflip/swirl-components/dist/swirl-components/swirl-components.css";
import "../styles/prism-vs-code-dark.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GTM_ID, pageview } from "../lib/gtm";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);
  return (
    <Layout>
      {/* Google Tag Manager - Global base code */}
      {isProd && (
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
          }}
        />
      )}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
