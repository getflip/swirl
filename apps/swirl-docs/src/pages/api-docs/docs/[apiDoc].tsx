import { H2, H3, H4 } from "src/components/Navigation/LinkedHeaders";
import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";

import { CodePreview } from "src/components/CodePreview";
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

  try {
    const data = await getComponentData(apiDoc);
    return {
      props: {
        document: data.document,
        frontMatter: data.frontMatter,
        title: apiDoc,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
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
  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>

      <DocumentationLayout
        data={{
          mdxContent: {
            document,
            components: generateMdxThemeComponents(),
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

function generateMdxThemeComponents() {
  return {
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

    ul: (props) => (
      <ul className="mb-8 leading-line-height-xl list-disc" {...props} />
    ),
    ol: (props) => (
      <ol className="mb-8 leading-line-height-xl list-decimal" {...props} />
    ),
    li: (props) => <li className="ml-4" {...props} />,
    p: (props) => <Text className="mb-8" {...props} />,
    code: (props) => {
      const { className, children } = props;

      if (className?.includes("language-") && typeof children === "string") {
        return (
          <CodePreview
            disableHeader
            className="mb-4"
            hasCopyButton
            codeExample={{
              code: children,
              isLongCode: false,
            }}
          />
        );
      }

      return (
        <code
          className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
          {...props}
        />
      );
    },
    h1: (props: any) => (
      <H2 className="mb-6" {...props} href={`#${props.id}`} />
    ),
    h2: (props: any) => (
      <H2 className="mb-6" {...props} href={`#${props.id}`} />
    ),
    h3: (props: any) => (
      <H3 className="mb-2" {...props} href={`#${props.id}`} />
    ),
    h4: (props: any) => (
      <H4 className="mb-2" {...props} href={`#${props.id}`} />
    ),
    h5: (props: any) => (
      <H4 className="mb-2" {...props} href={`#${props.id}`} />
    ),
    h6: (props: any) => (
      <H4 className="mb-2" {...props} href={`#${props.id}`} />
    ),
    hr: (props) => <hr className="my-8" {...props} />,
  } as MDXRemoteProps["components"];
}
