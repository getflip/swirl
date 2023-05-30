import {
  ApiDocumentation,
  ApiEndpoint,
  EndpointParam,
  EndpointParamType,
  createStaticPathsForSpecs,
  serializeMarkdownString,
} from "@swirl/lib/docs";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import OASNormalize from "oas-normalize";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { CodePreview } from "src/components/CodePreview";
import { Tag } from "src/components/Tags";
import { Parameter } from "src/components/Documentation/Parameter";
import { SchemaObject } from "oas/dist/rmoas.types";
import OASBuilder from "@swirl/lib/docs/src/oasBuilder";
import { API_SPEC_PATH } from "@swirl/lib/navigation";
import { Heading, LinkedHeading, Text } from "src/components/swirl-recreations";
import { useRouter } from "next/router";
import {
  EndpointUrl,
  HttpMethod,
  RequestLanguage,
  ResponseIndicator,
} from "src/components/CodePreview/CodePreviewHeader";

// SERVER CODE
async function generateSpecData(spec: string): Promise<ApiDocumentation> {
  let apiSpec: ApiDocumentation;

  const navItem = apiDocsNavItems.find((item) => item.url.includes(spec));
  const specName = navItem?.specName;
  const specPath = `${API_SPEC_PATH}/${specName}`;

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
      let examples: ApiEndpoint["responseExamples"] = [];

      const request = oasBuilder?.generateRequest(endpoint.operation);
      const responseExamples = endpoint.operation.getResponseExamples();

      responseExamples.forEach((responseExample) => {
        const mediaTypes = Object.keys(responseExample.mediaTypes);
        const valueExample = responseExample.mediaTypes[
          mediaTypes[0]
        ] as Array<any>;

        examples.push({
          status: responseExample.status,
          mediaType: mediaTypes[0],
          value: valueExample[0].value,
        });
      });

      const parameterTypes =
        endpoint.operation.getParametersAsJSONSchema() || [];

      return {
        title: endpoint.title,
        description: endpoint.operation.getDescription() || "",
        path: endpoint.path,
        isDeprecated: endpoint.operation.isDeprecated(),
        parameterTypes: parameterTypes.map((parameterType) => {
          const label = parameterType.label || "other";
          const type = parameterType.type as EndpointParamType;
          const requiredParams = parameterType.schema.required || [];
          const parametersObject = parameterType.schema.properties || {};
          if (
            typeof parametersObject === "object" &&
            Array.isArray(requiredParams)
          ) {
            const parameters: EndpointParam[] = Object.keys(
              parametersObject
            ).map((parameter) => {
              const prop = parametersObject[parameter] as SchemaObject;

              return {
                name: String(parameter),
                type: String(prop.type) || "",
                description: prop.description || "",
                required: requiredParams.includes(parameter),
              };
            });
            return { title: label, type, parameters: parameters };
          }
          return { title: label, type, parameters: [] };
        }),
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
  const document = await generateSpecData(apiSpec as string);

  return {
    props: {
      document,
    },
  };
};

// CLIENT CODE
export default function Document({ document }: { document: ApiDocumentation }) {
  const router = useRouter();

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
              h1: (props) => <Heading level={1} {...props} />,
              h2: (props) => <Heading level={2} {...props} />,
              a: (props) => (
                <span className="inline-flex items-center text-interactive-primary-default">
                  <a {...props} />
                  <i className="swirl-icons-OpenInNew28 text-[1.25rem] ml-1"></i>
                </span>
              ),
              ul: (props) => (
                <ul className="mb-4 leading-line-height-xl" {...props} />
              ),
              p: (props) => <Text {...props} />,
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
            {/* REMOVED FOR NOW: <DocumentationLayout.MDX /> (currently contains changelog, could contain more information in new specs) */}
            <div className="mt-20">
              {document.endpoints?.map((endpoint, index) => {
                const path = `https://getflip.dev${router.asPath}`; // TODO: use env variable
                const endpointId = endpoint.path.split("#")[1];

                return (
                  <article
                    key={`${endpoint.path}-${index}`}
                    aria-labelledby={endpoint.path.split("#")[1]}
                  >
                    <div className="grid md:grid-cols-api-spec gap-[2.5rem] mb-20">
                      {/** ENDPOINT DESCRIPTION */}
                      <div className="max-w-[37.5rem]">
                        <LinkedHeading
                          href={`${path}#${endpoint.path.split("#")[1]}`}
                        >
                          <Heading level={3} headingId={endpointId}>
                            {endpoint.title}
                            {endpoint.isDeprecated && (
                              <span className="ml-2 inline-flex">
                                <Tag content="deprecated" scheme="warning" />
                              </span>
                            )}
                          </Heading>
                        </LinkedHeading>
                        <ReactMarkdown
                          className="text-base mb-6"
                          components={{
                            p: (props) => <Text {...props} size="sm" />,
                            code: (props) => (
                              <code
                                className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
                                {...{ ...props, inline: "inline" }}
                              />
                            ),
                          }}
                        >
                          {endpoint.description}
                        </ReactMarkdown>
                        <div className="mb-6">
                          {endpoint.parameterTypes?.map(
                            (parameterType, index) => {
                              return (
                                <div
                                  key={`${parameterType.title}-${index}`}
                                  className="mb-6"
                                >
                                  <Heading level={4} className="mb-2">
                                    {parameterType.title}
                                  </Heading>
                                  <div>
                                    {parameterType.parameters?.map(
                                      (parameter, index) => {
                                        return (
                                          <Parameter
                                            key={`parameter.name${index}`}
                                            name={parameter.name}
                                            type={parameter.type}
                                            description={parameter.description}
                                            required={parameter.required}
                                          />
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      {/** CODE PREVIEWS */}
                      <div className="min-w-0 max-w-[37.5rem]">
                        <CodePreview
                          className="mb-4"
                          hasCopyButton
                          codeExample={{
                            code: endpoint.request.snippets["shell"],
                            isLongCode: false,
                            language: "shell",
                            request: endpoint.request.request,
                          }}
                          PreviewIndicator={<HttpMethod />}
                          MainHeaderContent={<EndpointUrl />}
                          ActionItems={<RequestLanguage />}
                        />
                        <div>
                          {endpoint.responseExamples[0] && (
                            <CodePreview
                              isLightTheme
                              PreviewIndicator={<ResponseIndicator />}
                              codeExample={{
                                code: JSON.stringify(
                                  endpoint.responseExamples[0].value as string,
                                  null,
                                  2
                                ),
                                isLongCode: true,
                                language: "shell",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        }
      />
    </>
  );
}
