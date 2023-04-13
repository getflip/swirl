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
import { Tag } from "src/components/Tags";
import { Parameter } from "src/components/Documentation/Parameter";

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

  useEffect(() => {
    if (document.definition) {
      const oasBuilder = new OASBuilder(document.definition);

      oasBuilder.dereference().then((oas) => {
        oas.setEndpoints().setOperations();
        setEndpointList(oas.operationsList);
      });
    }
  }, [document.definition]);

  function Parameters({
    properties,
    requiredProperties,
  }: {
    properties: any;
    requiredProperties: any;
  }) {
    const params = Object.keys(properties);

    if (params.length === 0) return <></>;

    return (
      <>
        {params.map((param) => {
          const required = requiredProperties.includes(param);
          const prop = properties[param];

          return (
            <Parameter
              key={param}
              name={param}
              type={prop.type}
              description={prop.description}
              required={required}
            />
          );
        })}
      </>
    );
  }

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
                  const codePreview = oasBuilder?.generateRequest(
                    endpoint.operation,
                    "javascript"
                  );
                  oasBuilder.generateResponse(endpoint.operation);

                  const paramsWrapper =
                    endpoint.operation.getParametersAsJSONSchema() || [];

                  return (
                    <>
                      <div>
                        <h2
                          id={endpoint.path.slice(2, endpoint.path.length)}
                          key={endpoint.title}
                        >
                          {endpoint.title}
                          {endpoint.operation.isDeprecated() && (
                            <span className="ml-2">
                              <Tag content="deprecated" scheme="warning" />
                            </span>
                          )}
                        </h2>
                        <ReactMarkdown
                          className="text-base"
                          components={{ p: () => <p className="text-base" /> }}
                        >
                          {endpoint.operation.getDescription()}
                        </ReactMarkdown>
                        <div className="mt-4">
                          {paramsWrapper.map((params) => {
                            const requiredParams = params.schema.required || [];
                            const parameterOfEndpoint =
                              params.schema.properties || {};

                            return (
                              <>
                                <h4 className="font-font-weight-semibold text-base mt-4">
                                  {params.label}
                                </h4>
                                <Parameters
                                  requiredProperties={requiredParams}
                                  properties={parameterOfEndpoint}
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="min-w-0">
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
                        <div className="mt-2">
                          <CodePreview
                            isHttpResponse
                            codeExample={{
                              code: oasBuilder.generateResponse(
                                endpoint.operation
                              ),

                              isLongCode: true,
                              language: "bash",
                            }}
                          >
                            <span className="text-font-size-base">
                              Response
                            </span>
                          </CodePreview>
                        </div>
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
