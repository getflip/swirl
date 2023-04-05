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
    shortDescription: oasBuilder.shortDescription,
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

function generateGeneralDescription(document: ApiDoc) {
  console.log("das ist die definition", document.definition?.info.description);

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
    const oasBuilder = new OASBuilder(document.definition)
      .setTitleAndPath()
      .setEndpoints()
      .setOperations();

    const oas = oasBuilder.oas;
    console.log(document.definition);
  }

  console.log("API DOCS Nav Items", apiDocsNavItems);
  return (
    <>
      <Head>
        <title>{`API | ${title}`}</title>
      </Head>
      <DocumentationLayout
        header={<DocumentationLayout.Header />}
        content={
          <>
            <DocumentationLayout.MDX />
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
