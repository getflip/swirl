import { ApiDoc, createStaticPathsForSpecs } from "@swirl/lib/docs";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import OASBuilder from "@swirl/lib/docs/src/OasBuilder";
import { API_SPEC_PATH } from "@swirl/lib/navigation";
import OASNormalize from "oas-normalize";
import { OASDocument } from "oas/dist/rmoas.types";
import { serializeMarkdownString } from "@swirl/lib/docs/src/singleDoc";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

async function getSpecData(spec: string): Promise<ApiDoc> {
  const specPath = `${API_SPEC_PATH}/${spec.replace("-", "_")}.yml`;
  // TO DO : Implement Builder based on definition and not only spec path (maybe a factory function?)
  const oasBuilder = await new OASBuilder(specPath).parseOAS();
  const oasDefinition = (await new OASNormalize(specPath, {
    enablePaths: true,
  }).validate()) as OASDocument;

  oasBuilder.setTitleAndPath().setDescription();

  return {
    title: oasBuilder.title,
    path: oasBuilder.path,
    definition: oasDefinition,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const specs = createStaticPathsForSpecs();

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
  console.log(document);

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
