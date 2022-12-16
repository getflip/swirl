import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { BASE_PATHS, DOCUMENT_ENUM } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { componentsNavItems } from "@swirl/lib/navigation/src/data/components.data";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { createStaticPathsData } from "@swirl/lib/docs";
import { ScriptProps } from "next/script";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

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

  const document = await getComponentData(componentDoc);

  return {
    props: {
      document,
      title: componentDoc,
    },
  };
};

export default function Component({
  document,
  title,
}: {
  title: string;
  document: any;
}) {
  const [frontMatter, setFrontMatter] = useState<any>(null);

  useEffect(() => {
    setFrontMatter(document?.frontmatter);
  }, [document]);

  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>
      <DocumentationLayout
        categoryLinkList={componentsNavItems}
        document={document}
        frontMatter={frontMatter}
      />
    </>
  );
}
