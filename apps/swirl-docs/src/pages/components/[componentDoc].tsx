import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { DOCUMENTATION_CATEGORY } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { componentsNavItems } from "@swirl/lib/navigation/src/data/components.data";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { createStaticPathsData } from "@swirl/lib/docs";
import { ScriptProps } from "next/script";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation(
    DOCUMENTATION_CATEGORY.COMPONENTS,
    document
  );
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData(DOCUMENTATION_CATEGORY.COMPONENTS);

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
  const components = {
    ...LinkedHeaders,
  };

  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>

      <DocumentationLayout
        data={{
          mdxContent: {
            document,
            mdxComponents: components,
          },
          navigationLinks: componentsNavItems,
        }}
        header={<DocumentationLayout.Header />}
        content={
          <>
            <DocumentationLayout.ComponentPreview />
            <DocumentationLayout.MDX />
          </>
        }
        footer={<DocumentationLayout.Footer />}
        navigation={<DocumentationLayout.Navigation />}
      />
    </>
  );
}
