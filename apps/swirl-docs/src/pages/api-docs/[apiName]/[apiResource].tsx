import {
  ApiResourceDocumentation,
  createStaticPathsForSpec,
  serializeMarkdownString,
} from "@swirl/lib/docs";
import { GetStaticPaths, GetStaticProps } from "next";

import { isProd } from "@swirl/lib/env";
import { NavItem } from "@swirl/lib/navigation";
import { apiEndpointDocumentation } from "@swirl/lib/navigation/src/data/apiEndpoints.data";
import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { useRouter } from "next/router";
import { HttpMethods } from "oas/dist/rmoas.types";
import { useLayoutEffect } from "react";
import { DocumentationMdxComponents } from "src/components/Documentation/DocumentationMdxComponents";
import { EndpointCodePreview } from "src/components/Documentation/EndpointCodePreview";
import { EndpointDescription } from "src/components/Documentation/EndpointDescription";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { Heading } from "src/components/swirl-recreations";
import {
  mapHttpMethodToTagContent,
  mapHttpMethodToTagScheme,
  Tag,
} from "src/components/Tags";

export const getStaticPaths: GetStaticPaths = async () => {
  const specs = (await createStaticPathsForSpec()) ?? [];

  return {
    fallback: false,
    paths: specs,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (
    !context.params ||
    !("apiName" in context.params) ||
    !("apiResource" in context.params)
  ) {
    return {
      notFound: true,
    };
  }

  const { apiName, apiResource } = context.params;

  const document: ApiResourceDocumentation | undefined =
    apiEndpointDocumentation
      .find((api) => api.id === apiName)
      ?.resources.find((resource) => resource.id === apiResource);

  if (!document) {
    return { notFound: true };
  }

  return {
    props: {
      document: JSON.parse(JSON.stringify(document)), // remove undefined values
      description: await serializeMarkdownString(""), // needed to use the documentation layout component.
      navItems: apiSpecsNavItems,
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
            <article>
              <Heading level={2} className="mb-3">
                Endpoint Overview
              </Heading>
              {document.endpoints.map((endpoint) => (
                <a href={"#" + endpoint.id} key={endpoint.id} className="">
                  <div className="mb-3 box-border border-border-1 border-border-default max-w-full w-full rounded-xl text-font-size-sm p-2 flex flex-col md:flex-row bg-surface-default hover:bg-surface-hovered pressed:bg-surface-pressed">
                    <Tag
                      httpTag
                      content={mapHttpMethodToTagContent(endpoint.method || "")}
                      scheme={mapHttpMethodToTagScheme(
                        endpoint.method as HttpMethods
                      )}
                    />{" "}
                    <code style={{ wordBreak: "break-all" }}>
                      {endpoint.path}
                    </code>
                    <div className="md:text-right flex-grow">
                      {endpoint.title}
                    </div>
                  </div>
                </a>
              ))}
            </article>
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
