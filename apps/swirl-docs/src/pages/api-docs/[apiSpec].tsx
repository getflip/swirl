import { ApiDoc, createStaticPathsForSpecs } from "@swirl/lib/docs";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import OASBuilder from "@swirl/lib/docs/src/OasBuilder";
import OASNormalize from "oas-normalize";
import { serializeMarkdownString } from "@swirl/lib/docs/src/singleDoc";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

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
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const specs = createStaticPathsForSpecs();

  console.log("specs", specs);

  return {
    fallback: false,
    paths: specs,
  };
};

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { apiSpec: string }
> = async (context: any) => {
  const { apiSpec } = context.params;

  const document = await getSpecData(apiSpec);

  const markdownString = document.definition?.info.description
    ?.replace("<SecurityDefinitions />", "")
    .replaceAll("user_external_id", "123")
    .replaceAll("postId", "123")
    .replaceAll("commentId", "123")
    .replaceAll("attachment_id", "123");

  const markdown = await serializeMarkdownString(markdownString!);

  console.log("document title", document.title);

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
  if (document.definition) {
    console.log("oasBuilder");
    const oasBuilder = new OASBuilder(document.definition)
      .setEndpoints()
      .setOperations();

    // create a function to get a stripped down operations object that makes it possible to build the navigation for the API docs

    console.log("operation", oasBuilder.operations);
  }

  console.log("API DOCS Nav Items", apiDocsNavItems);
  return (
    <>
      <Head>
        <title>{`API | ${title}`}</title>
      </Head>
      <DocumentationLayout
        content={
          <>
            <h1>{document.title}</h1>
            <DocumentationLayout.MDX />
          </>
        }
        footer={<DocumentationLayout.Footer />}
        data={{
          mdxContent: {
            document: markdown,
          },
          navigationLinks: apiDocsNavItems,
        }}
      />
    </>
  );
}
