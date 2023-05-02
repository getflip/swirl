import { createStaticPathsForSpecs } from "@swirl/lib/docs";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import OASBuilder from "@swirl/lib/docs/src/OasBuilder";
import OASNormalize from "oas-normalize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { CodePreview } from "src/components/CodePreview";
import { Tag } from "src/components/Tags";
import { Parameter } from "src/components/Documentation/Parameter";
import { SwirlIconOpenInNew } from "@getflip/swirl-components-react";
import { OASDocument, SchemaObject } from "oas/dist/rmoas.types";
import { ResponseExamples } from "oas/dist/operation/get-response-examples";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import sectionize from "remark-sectionize";

export function serializeMarkdownString(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm, sectionize],
      format: "mdx",
    },
  });
}

type Parameter = {
  name: string;
  type: string;
  description: string;
  required: boolean;
};
type ParameterType = "path" | "query" | "header" | "cookie" | "body" | "other";
type ParameterTypes = Array<{
  type: ParameterType;
  title: string;
  parameters: Array<Parameter>;
}>;
type ResponseExample = {
  status: string;
  mediaType: string;
  value: unknown;
};
type Endpoint = {
  title: string;
  description: string;
  path: string;
  request: ReturnType<OASBuilder["generateRequest"]>;
  responseExamples: Array<ResponseExample>;
  isDeprecated?: boolean;
  parameterTypes?: ParameterTypes;
};

export type ApiSpec = {
  title: string;
  shortDescription: string;
  description: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  endpoints: Array<Endpoint>;
};

async function getSpecData(spec: string): Promise<ApiSpec> {
  // Initialization
  let apiSpec: ApiSpec;

  // Get the spec path based on the nav items
  const navItem = apiDocsNavItems.find((item) => item.url.includes(spec));
  const specPath = navItem?.specPath;

  // create the OAS document && OAS builder
  const oasDocument = await new OASNormalize(specPath, {
    enablePaths: true,
  }).validate();
  const oasBuilder = await new OASBuilder(oasDocument)
    .dereference()
    .then((oas) => {
      oas
        .setTitleAndPath()
        .setDescription()
        .setEndpoints()
        .setOperations()
        .setDetailedEndpoints();

      return oas;
    });

  const serializedDescription = await serializeMarkdownString(
    oasBuilder.oasDocument.info.description
      ?.replace(oasDocument.title, "")
      .replace(oasDocument.shortDescription, "")
      .replace("<SecurityDefinitions />", "")
      .replace("# Authentication", "")
      .replaceAll("user_external_id", "123")
      .replaceAll("postId", "123")
      .replaceAll("commentId", "123")
      .replaceAll("attachment_id", "123") as string
  );

  apiSpec = {
    title: oasBuilder.title,
    shortDescription: oasBuilder.shortDescription,
    description: serializedDescription,
    endpoints: oasBuilder.endpoints.map((endpoint) => {
      let examples: Endpoint["responseExamples"] = [];

      const request = oasBuilder?.generateRequest(endpoint.operation);
      const responseExamples = endpoint.operation.getResponseExamples();

      responseExamples.forEach((responseExample) => {
        const mediaTypes = Object.keys(responseExample.mediaTypes);
        const valueExample = responseExample.mediaTypes[
          mediaTypes[0]
        ] as Array<any>;

        let example: ResponseExample = {
          status: responseExample.status,
          mediaType: mediaTypes[0],
          value: valueExample[0].value,
        };

        examples.push(example);
      });

      const parameterTypes =
        endpoint.operation.getParametersAsJSONSchema() || [];

      return {
        title: endpoint.title,
        description: endpoint.operation.getDescription() || "",
        path: endpoint.path,
        isDeprecated: endpoint.operation.isDeprecated(),
        // parameterTypes: parameterTypes.map((parameterType) => {
        //   const label = parameterType.label || "other";
        //   const type = parameterType.type as ParameterType;
        //   const requiredParams = parameterType.schema.required || [];
        //   const parametersObject = parameterType.schema.properties || {};
        //   if (
        //     typeof parametersObject === "object" &&
        //     Array.isArray(requiredParams)
        //   ) {
        //     const parameters = Object.keys(parametersObject);
        //     {
        //       parameters.forEach((parameter) => {
        //         const required = requiredParams.includes(parameter);
        //         const prop = parametersObject[parameter] as SchemaObject;
        //       });
        //     }
        //   }
        //   return { title: label, type, parameters: [] };
        // }),
        parameterTypes: [],
        request,
        responseExamples: examples,
      };
    }),
  };

  return apiSpec;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const specs = createStaticPathsForSpecs();

  return {
    fallback: false,
    paths: specs,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || !("apiSpec" in context.params)) {
    return {
      notFound: true,
    };
  }

  const { apiSpec } = context.params;
  const document = await getSpecData(apiSpec as string);

  return {
    props: {
      document,
    },
  };
};

export default function Document({ document }: { document: ApiSpec }) {
  return (
    <>
      <Head>
        <title>{`API | ${document.title}`}</title>
      </Head>
      <DocumentationLayout
        data={{
          mdxContent: {
            document: document.description,
            components: {
              h1: (props) => <h2 className="text-2xl font-bold" {...props} />,
              h2: (props) => <h3 className="text-xl font-bold" {...props} />,
              a: (props) => (
                <span className="inline-flex items-center text-interactive-primary-default">
                  <a {...props} />
                  <SwirlIconOpenInNew className="ml-1" size={20} />
                </span>
              ),
              ul: (props) => (
                <ul className="mb-4 leading-line-height-xl" {...props} />
              ),
              p: (props) => (
                <p className="text-base leading-line-height-xl">
                  {props.children}
                </p>
              ),
              code: (props) => (
                <code
                  className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
                  {...props}
                />
              ),
            },
          },
          frontMatter: {
            title: document.title,
            description: document.shortDescription,
            examples: [],
          },
          navigationLinks: apiDocsNavItems,
        }}
        disableToc
        header={<DocumentationLayout.Header className="col-span-2" />}
        content={
          <>
            <DocumentationLayout.MDX />
            <div className="mt-20">
              {document.endpoints?.map((endpoint, index) => {
                return (
                  <>
                    <h2
                      className="text-font-size-2xl font-font-weight-semibold mb-4"
                      id={endpoint.path.split("#")[1]}
                      key={`endpoint.title${index}`}
                    >
                      {endpoint.title}
                      {endpoint.isDeprecated && (
                        <span className="ml-2">
                          <Tag content="deprecated" scheme="warning" />
                        </span>
                      )}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                      <div>
                        <ReactMarkdown
                          className="text-base"
                          components={{
                            p: (props) => (
                              <p className="text-base">{props.children}</p>
                            ),
                            code: (props) => (
                              <code
                                className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {endpoint.description}
                        </ReactMarkdown>
                        <div className="mt-4"></div>
                      </div>
                      <div className="min-w-0">
                        <CodePreview
                          codeExample={{
                            code: endpoint.request.code,
                            isLongCode: false,
                            language: "bash",
                            request: endpoint.request.request,
                          }}
                        >
                          <CodePreview.Request />
                        </CodePreview>
                        <div className="mt-2">
                          {endpoint.responseExamples[0] && (
                            <CodePreview
                              isHttpResponse
                              codeExample={{
                                code: JSON.stringify(
                                  endpoint.responseExamples[0].value as string,
                                  null,
                                  2
                                ),
                                isLongCode: true,
                                language: "bash",
                              }}
                            >
                              <span className="text-font-size-base">
                                Response
                              </span>
                            </CodePreview>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        }
        footer={<DocumentationLayout.Footer />}
      />
    </>
  );
}
