import {
  ApiResourceDocumentation,
  createStaticPathsForSpec,
  serializeMarkdownString,
} from "@swirl/lib/docs";
import { GetStaticPaths, GetStaticProps } from "next";
import { Heading, Text } from "src/components/swirl-recreations";

import OASBuilder from "@swirl/lib/docs/src/oasBuilder";
import { isProd } from "@swirl/lib/env";
import { API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
import Head from "next/head";
import OASNormalize from "oas-normalize";
import { EndpointCodePreview } from "src/components/Documentation/EndpointCodePreview";
import { EndpointDescription } from "src/components/Documentation/EndpointDescription";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { useRouter } from "next/router";
import { ApiDocumentationsFacade } from "@swirl/lib/docs/src/ApiDocumentationsFacade";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

// STATIC GENERATION CODE
export const getStaticPaths: GetStaticPaths = async () => {
  const specs = (await createStaticPathsForSpec()) ?? [];

  return {
    fallback: false,
    paths: specs,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_STAGE === "production") {
    return { notFound: true };
  }

  if (
    !context.params ||
    !("apiName" in context.params) ||
    !("apiResource" in context.params)
  ) {
    return {
      notFound: true,
    };
  }

  // TODO: singleton for apiDocumentations
  const oasDocument = await new OASNormalize(`${API_SPEC_PATH}/merged.yml`, {
    enablePaths: true,
  }).validate();

  const oasBuilder = await new OASBuilder(oasDocument).dereference();
  const apiDocumentations = (await oasBuilder.setApiDocumentations())
    .apiDocumentations;

  const { apiName, apiResource } = context.params;

  const document: ApiResourceDocumentation | undefined = apiDocumentations
    .find((api) => api.id === apiName)
    ?.resources.find((resource) => resource.id === apiResource);

  if (!document) {
    return { notFound: true };
  }

  const navItems = await ApiDocumentationsFacade.navItems;

  return {
    props: {
      document: JSON.parse(JSON.stringify(document)), // remove undefined values
      description: await serializeMarkdownString(""),
      navItems,
    },
  };
};

// CLIENT CODE
export default function Document({
  document,
  description,
  navItems,
}: {
  document: ApiResourceDocumentation;
  description: MDXRemoteSerializeResult;
  navItems: NavItem[];
}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${document.title} — getflip.dev`}</title>
      </Head>
      <DocumentationLayout
        data={{
          mdxContent: {
            document: description,
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
          navigationLinks: navItems,
        }}
        disableToc
        header={<DocumentationLayout.Header className="col-span-2" />}
        content={
          <>
            {/* REMOVED FOR NOW: <DocumentationLayout.MDX /> (currently contains changelog, could contain more information in new specs) */}
            <div className="mt-20">
              {document.endpoints?.map((endpoint, index) => {
                const host = isProd
                  ? "https://getflip.dev"
                  : "http://localhost:3000";

                const path = `${host}${router.asPath}`;

                const initialResponseExampleStatus = Object.keys(
                  endpoint.responseExamples
                )[0];

                return (
                  <article
                    key={`${endpoint.path}-${index}`}
                    aria-labelledby={endpoint.path.split("#")[1]}
                  >
                    <div className="grid md:grid-cols-api-spec gap-[2.5rem] mb-20">
                      <EndpointDescription
                        endpoint={endpoint}
                        endpointId={endpoint.id}
                        path={path}
                      />
                      <EndpointCodePreview
                        endpoint={endpoint}
                        initialResponseExampleStatus={
                          initialResponseExampleStatus
                        }
                      />
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
