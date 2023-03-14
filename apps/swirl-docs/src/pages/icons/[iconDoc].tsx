import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { DOCUMENTATION_CATEGORY } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { iconsNavItems } from "@swirl/lib/navigation/src/data/iconsChildren.data";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation(
    DOCUMENTATION_CATEGORY.ICONS,
    document
  );
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData(DOCUMENTATION_CATEGORY.ICONS);

  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { iconDoc: string }
> = async (context: any) => {
  const { iconDoc } = context.params;

  const document = await getComponentData(iconDoc);

  return {
    props: {
      document,
      title: iconDoc,
    },
  };
};

export default function Component({
  document,
  title,
}: {
  document: any;
  title: string;
}) {
  const components = {
    ...LinkedHeaders,
  };
  return (
    <>
      <Head>
        <title>{`Swirl | ${title}`}</title>
      </Head>
      <DocumentationLayout
        header={"hello"}
        content={"hello"}
        footer={"hello"}
        data={document}
      />
    </>
  );
}
