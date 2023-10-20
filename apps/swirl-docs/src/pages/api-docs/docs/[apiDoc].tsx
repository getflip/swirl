import { H2, LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";

import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ScriptProps } from "next/script";
import { Text } from "src/components/swirl-recreations";
import { apiNavItems } from "@swirl/lib/navigation/src/data/api.data";
import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";

async function getComponentData(document: string) {
  const serializedDocument = await generateMdxFromDocumentation(
    "api",
    document
  );
  return {
    document: serializedDocument,
    frontMatter: serializedDocument.frontmatter,
  };
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData("api") ?? [];

  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { componentDoc: string }
> = async (context: any) => {
  const { apiDoc } = context.params;

  const data = await getComponentData(apiDoc);

  return {
    props: {
      document: data.document,
      frontMatter: data.frontMatter,
      title: apiDoc,
    },
  };
};

export default function Component({
  document,
  frontMatter,
  title,
}: {
  title: string;
  document: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  frontMatter: FrontMatter;
}) {
  const components = {
    a: (props) => {
      const isRegularLink = typeof props.children === "string";

      return isRegularLink ? (
        <span className="inline-flex items-center text-interactive-primary-default">
          <a {...props} />
          <i className="swirl-icons-OpenInNew28 text-[1.25rem] ml-1"></i>
        </span>
      ) : (
        <a {...props} />
      );
    },

    ul: (props) => <ul className="mb-4 leading-line-height-xl" {...props} />,
    p: (props) => <Text {...props} />,
    code: (props) => (
      <code
        className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
        {...props}
      />
    ),
    h1: (props: any) => <H2 {...props} href={`#${props.id}`} />,
    h2: (props: any) => <H2 {...props} href={`#${props.id}`} />,
  } as MDXRemoteProps["components"];

  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>

      <DocumentationLayout
        data={{
          mdxContent: {
            document,
            components,
          },
          navigationLinks: apiNavItems,
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
