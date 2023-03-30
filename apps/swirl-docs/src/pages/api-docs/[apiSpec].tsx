import {
  ApiDoc,
  createStaticPathsData,
  createStaticPathsForSpecs,
} from "@swirl/lib/docs";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";
import OASBuilder from "@swirl/lib/docs/src/oasBuilder";
import { API_SPEC_PATH } from "@swirl/lib/navigation";

// async function getMdxData(document: string) {
//   return await generateMdxFromDocumentation("apiDocs", document);
// }

async function getSpecData(spec: string): Promise<ApiDoc> {
  const specPath = `${API_SPEC_PATH}/${spec.replace("-", "_")}.yml`;
  const oasBuilder = await new OASBuilder(specPath).parseOAS();
  oasBuilder.setTitleAndPath().setDescription().setPaths().setOperations();
  return {
    title: oasBuilder.title,
    path: oasBuilder.path,
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

  console.log("document title", document.title);

  return {
    props: {
      document,
      title: document.title,
    },
  };
};

export default function Document({
  document,
  title,
}: {
  document: ApiDoc;
  title: string;
}) {
  console.log(document);

  return (
    <>
      <Head>
        <title>{`API | ${title}`}</title>
      </Head>
      <DocumentationLayout
        content={<h1>Hello World</h1>}
        data={{
          navigationLinks: apiDocsNavItems,
        }}
      />
    </>
  );
}
