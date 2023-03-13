import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import OASNormalize from "oas-normalize";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { OASDocument } from "oas/dist/rmoas.types";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation("apiDocs", document);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryDocs = createStaticPathsData("apiDocs");

  return {
    fallback: false,
    paths: categoryDocs,
  };
};

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { tokenDoc: string }
> = async (context: any) => {
  const { apiDoc } = context.params;

  const document = await getComponentData(apiDoc);

  const oasYaml = new OASNormalize(`./specs/${apiDoc}.yaml`, {
    enablePaths: true,
  });

  const definition = (await oasYaml.validate()) as OASDocument;

  return {
    props: {
      document,
      title: apiDoc,
      definition,
    },
  };
};

export default function Component({
  document,
  title,
  definition,
}: {
  document: any;
  title: string;
  definition: OASDocument;
}) {
  const components = {
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  };

  return (
    <>
      <Head>
        <title>{`Swirl | ${title}`}</title>
      </Head>
      <DocumentationLayout
        categoryLinkList={apiDocsNavItems}
        document={document}
        mdxComponents={components}
        frontMatter={document.frontmatter}
        oasSpec={definition}
      />
    </>
  );
}
