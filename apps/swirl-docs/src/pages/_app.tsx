import "@getflip/swirl-components/dist/swirl-components/swirl-components.css";
import "../styles/globals.css";
import "../styles/prism-vs-code-dark.css";

import { isProdDeployment } from "@swirl/lib/env";
import { Analytics } from "@vercel/analytics/react";
import { withPasswordProtect } from "next-password-protect";
import type { AppProps } from "next/app";
import Layout from "src/components/Layout";

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

const App = isProdDeployment ? GetFlipDev : PasswordProtectedGetFlipDev;

export default App;
