import { ApiDoc, Endpoint, createStaticPathsForSpecs } from "@swirl/lib/docs";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import OASBuilder from "@swirl/lib/docs/src/OasBuilder";
import OASNormalize from "oas-normalize";
import { serializeMarkdownString } from "@swirl/lib/docs/src/singleDoc";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { CodePreview } from "src/components/CodePreview";

async function getSpecData(spec: string): Promise<ApiDoc> {
  const navItem = apiDocsNavItems.find((item) => item.url.includes(spec));
  const specPath = navItem?.specPath;

  const oasDocument = await new OASNormalize(specPath, {
    enablePaths: true,
  }).validate();

  const oasBuilder = await new OASBuilder(oasDocument);

  oasBuilder.setTitleAndPath().setDescription().setEndpoints().setOperations();

  return {
    title: oasBuilder.title,
    path: oasBuilder.path,
    definition: oasBuilder.oasDocument,
    shortDescription: oasBuilder.shortDescription,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const specs = createStaticPathsForSpecs();

  return {
    fallback: false,
    paths: specs,
  };
};

function generateGeneralDescription(document: ApiDoc) {
  return document.definition?.info.description
    ?.replace(document.title, "")
    .replace(document.shortDescription, "")
    .replace("<SecurityDefinitions />", "")
    .replaceAll("user_external_id", "123")
    .replaceAll("postId", "123")
    .replaceAll("commentId", "123")
    .replaceAll("attachment_id", "123");
}

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { apiSpec: string }
> = async (context: any) => {
  const { apiSpec } = context.params;
  const document = await getSpecData(apiSpec);

  const generalDescription = generateGeneralDescription(document) as string;
  const markdown = await serializeMarkdownString(generalDescription);

  return {
    props: {
      document,
      markdown,
      title: document.title,
    },
  };
};

export default function Document({
  document,
  markdown,
  title,
}: {
  document: ApiDoc;
  markdown: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  title: string;
}) {
  const [endpointList, setEndpointList] = useState<Endpoint[]>([]);

  if (document.definition) {
    const oasBuilder = new OASBuilder(document.definition);
    oasBuilder.setEndpoints().setOperations();

    console.log(oasBuilder.operationsList);
  }

  useEffect(() => {
    if (document.definition) {
      const oasBuilder = new OASBuilder(document.definition);
      oasBuilder.setEndpoints().setOperations();

      setEndpointList(oasBuilder.operationsList);
    }
  }, [document.definition]);

  return (
    <>
      <Head>
        <title>{`API | ${title}`}</title>
      </Head>
      <DocumentationLayout
        disableToc
        header={
          <DocumentationLayout.Header additionalClassNames="col-span-2" />
        }
        content={
          <>
            <DocumentationLayout.MDX />
            <div className="grid md:grid-cols-2 gap-8">
              {endpointList.map((endpoint) => {
                if (document.definition) {
                  const oasBuilder = new OASBuilder(document.definition);
                  oasBuilder.setEndpoints().setOperations();
                  const codePreview = oasBuilder?.createCodePreview(
                    endpoint.operation,
                    "javascript"
                  );
                  return (
                    <>
                      <div>
                        <h2
                          id={endpoint.path.slice(2, endpoint.path.length)}
                          key={endpoint.title}
                        >
                          {endpoint.title}
                        </h2>
                        <ReactMarkdown>
                          {endpoint.operation.getDescription()}
                        </ReactMarkdown>
                      </div>
                      <div>
                        <CodePreview
                          codeExample={{
                            code: codePreview.code,
                            isLongCode: false,
                            language: "bash",
                            request: codePreview.request,
                          }}
                        >
                          <CodePreview.Request />
                        </CodePreview>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </>
        }
        footer={<DocumentationLayout.Footer />}
        data={{
          mdxContent: {
            document: markdown,
          },
          frontMatter: {
            title: document.title,
            description: document.shortDescription,
            examples: [],
          },
          navigationLinks: apiDocsNavItems,
        }}
      />
    </>
  );
}
