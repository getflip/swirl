import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import {
  BASE_PATHS,
  DOCUMENT_ENUM,
  DocHeadline,
} from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { createLinkLists } from "@swirl/lib/docs/src/links";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { iconsNavItems } from "@swirl/lib/navigation/src/data/iconsChildren.data";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation(BASE_PATHS.ICONS, document);
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData(
    BASE_PATHS.ICONS,
    DOCUMENT_ENUM.ICONS
  );

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
  const { documentLinkList } = createLinkLists(BASE_PATHS.ICONS, iconDoc);

  return {
    props: {
      document,
      documentLinkList,
      title: iconDoc,
    },
  };
};

export default function Component({
  document,
  documentLinkList,
  title,
}: {
  document: any;
  documentLinkList: DocHeadline[];
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
        categoryLinkList={iconsNavItems}
        documentLinkList={documentLinkList}
        document={document}
        mdxComponents={components}
        frontMatter={document.frontmatter}
      />
    </>
  );
}
