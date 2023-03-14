import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import { CodePreview } from "src/components/CodePreview";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";

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
      <DocumentationLayout
        data={{
          mdxContent: {
            document: undefined,
            mdxComponents: undefined,
          },
          navigationLinks: apiDocsNavItems,
        }}
        navigation={<DocumentationLayout.Navigation />}
        content={
          <div className="flex">
            <main id="main" className="w-full h-full">
              <section className="flex flex-col py-14 px-24">
                <h1 className="mb-4">API Docs</h1>
                <CodePreview
                  codeExample={{
                    code: codeExample,
                    isLongCode: false,
                    request: {
                      httpVersion: "2",
                      cookies: [],
                      headers: [],
                      queryString: [],
                      bodySize: 123,
                      headersSize: 123,
                      url: "/api/specs/group",
                      method: "POST",
                    },
                  }}
                >
                  <CodePreview.Request />
                </CodePreview>
              </section>
            </main>
          </div>
        }
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  };
};

export default ApiDocs;
