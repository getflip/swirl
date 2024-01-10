import { MDXRemoteSerializeResult } from "next-mdx-remote";

import { FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { NavItem } from "@swirl/lib/navigation";
import { apiNavItems } from "@swirl/lib/navigation/src/data/api.data";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { GetStaticProps } from "next";
import Head from "next/head";
import { DocumentationMdxComponents } from "src/components/Documentation/DocumentationMdxComponents";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";

async function getComponentData(document: string) {
  const apiDocNavItem = apiDocsNavItems.find(
    (apiDoc) => apiDoc.url == "/api-docs/docs/" + document
  );

  const serializedDocument = await generateMdxFromDocumentation(
    "api",
    apiDocNavItem?.mdxFilename || document
  );

  return {
    document: serializedDocument,
    frontMatter: serializedDocument.frontmatter,
  };
}

export async function getStaticPaths() {
  const categoryDocs = apiDocsNavItems.map((item) => ({
    params: { apiDoc: item.url?.split("/").slice(-1)[0] },
  }));
  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { apiDoc } = context.params;

  try {
    const data = await getComponentData(apiDoc);
    return {
      props: {
        document: data.document,
        frontMatter: data.frontMatter,
        navItems: apiNavItems,
      },
    };
  } catch (error) {
    // Show mdx parse errors
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default function Component({
  document,
  frontMatter,
  navItems,
}: {
  document: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  frontMatter: FrontMatter; // TODO: Frontmatter could be put in document
  navItems: NavItem[];
}) {
  return (
    <>
      <Head>
        <title>{frontMatter.title} — getflip.dev</title>
      </Head>

      <DocumentationLayout
        data={{
          mdxContent: {
            document,
            components: DocumentationMdxComponents,
          },
          navigationLinks: navItems,
          frontMatter,
        }}
        header={<DocumentationLayout.Header />}
        content={
          <>
            <DocumentationLayout.MDX />
          </>
        }
      />
    </>
  );
}
