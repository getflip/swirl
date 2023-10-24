import "../styles/globals.css";
import "@getflip/swirl-components/dist/swirl-components/swirl-components.css";
import "../styles/prism-vs-code-dark.css";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Layout from "src/components/Layout";
import { withPasswordProtect } from "next-password-protect";

function GetFlipDev({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

const PasswordProtectedGetFlipDev = withPasswordProtect(GetFlipDev, {
  loginComponentProps: {
    logo: "/flip-logo.svg",
    buttonBackgroundColor: "#145af5",
    buttonColor: "#fff",
  },
});

const App =
  process.env.NEXT_PUBLIC_DEPLOYMENT_STAGE === "production"
    ? GetFlipDev
    : PasswordProtectedGetFlipDev;

export default App;
