import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "src/components/Layout";
import "@getflip/swirl-components/dist/swirl-components/swirl-components.css";
import "../styles/prism-vs-code-dark.css";
import { Analytics } from "@vercel/analytics/react";
import { withPasswordProtect } from "next-password-protect";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default withPasswordProtect(MyApp, {
  loginComponentProps: {
    logo: "/flip-logo.svg",
    buttonBackgroundColor: "#145af5",
    buttonColor: "#fff",
  },
});
