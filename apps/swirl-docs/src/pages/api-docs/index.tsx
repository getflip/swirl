import Head from "next/head";
import { GetStaticProps } from "next/types";
import { CodePreview } from "src/components/CodePreview";

import compJson from "./comp.json";

const ApiDocs = () => {
  const codeExample = `
  curl --request GET
  --url 'http://localhost:3000/app-compatibility?app_type=DESKTOP&device_type=MOBILE&os_family=IOS'
  --header 'Accept-Language: '
  --header 'Content-Type: application/json'
  `;

  return (
    <>
      <Head>
        <title>API Docs</title>
      </Head>
      <div className="flex">
        {/* <CategoryNav categoryLinkList={tokensNavItems} /> */}
        <main id="main" className="w-full h-full">
          <section className="flex flex-col py-14 px-24">
            <h1 className="mb-4">API Docs</h1>
            <CodePreview
              header={<CodePreview.NpmPackageLink />}
              codeExample={{ code: codeExample, isLongCode: false }}
            />
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

export default ApiDocs;
