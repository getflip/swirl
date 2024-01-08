import {
  ApiResourceDocumentation,
  createStaticPathsForSpec,
  serializeMarkdownString,
} from "@swirl/lib/docs";
import { GetStaticPaths, GetStaticProps } from "next";

import { ApiDocumentationsFacade } from "@swirl/lib/docs/src/ApiDocumentationsFacade";
import OASBuilder from "@swirl/lib/docs/src/oasBuilder";
import { isProd, isProdDeployment } from "@swirl/lib/env";
import { API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { useRouter } from "next/router";
import OASNormalize from "oas-normalize";
import { useLayoutEffect } from "react";
import { DocumentationMdxComponents } from "src/components/Documentation/DocumentationMdxComponents";
import { EndpointCodePreview } from "src/components/Documentation/EndpointCodePreview";
import { EndpointDescription } from "src/components/Documentation/EndpointDescription";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";

// STATIC GENERATION CODE
export const getStaticPaths: GetStaticPaths = async () => {
  const specs = (await createStaticPathsForSpec()) ?? [];

  return {
    fallback: false,
    paths: specs,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (isProdDeployment) {
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
  const apiDocumentations = oasBuilder.setApiDocumentations().apiDocumentations;

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

  useLayoutEffect(() => {
    // First scroll on page reload
    if (location.hash) {
      window.document
        .getElementById(location.hash.substring(1))
        ?.scrollIntoView();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`${document.title} — getflip.dev`}</title>
      </Head>
      <DocumentationLayout
        data={{
          mdxContent: {
            document: description,
            components: DocumentationMdxComponents,
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
                    aria-labelledby={endpoint.id}
                  >
                    <div className="grid md:grid-cols-api-spec gap-[2.5rem] mb-20">
                      <EndpointDescription endpoint={endpoint} path={path} />
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
