import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { BASE_PATHS, DOCUMENT_ENUM } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { componentsNavItems } from "@swirl/lib/navigation/src/data/components.data";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { createStaticPathsData } from "@swirl/lib/docs";
import { createLinkLists } from "@swirl/lib/docs/src/links";
import { ScriptProps } from "next/script";
import { GetStaticProps } from "next";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation(BASE_PATHS.COMPONENTS, document);
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData(
    BASE_PATHS.COMPONENTS,
    DOCUMENT_ENUM.COMPONENTS
  );

  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { componentDoc: string }
> = async (context: any) => {
  const { componentDoc } = context.params;
  const { documentLinkList } = createLinkLists(
    BASE_PATHS.COMPONENTS,
    componentDoc
  );
  const document = await getComponentData(componentDoc);

  return {
    props: {
      document,
      documentLinkList,
      title: componentDoc,
    },
  };
};

export default function Component({
  document,
}: {
  title: string;
  document: any;
}) {
  const components = {};

  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>
      <DocumentationLayout
        categoryLinkList={componentsNavItems}
        documentLinkList={[]}
        document={document}
        mdxComponents={components}
        frontMatter={document.frontmatter}
      />
    </>
  );
}
