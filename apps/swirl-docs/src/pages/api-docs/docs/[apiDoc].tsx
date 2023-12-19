import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";
import { H2, H3, H4 } from "src/components/Navigation/LinkedHeaders";

import { ApiDocumentationsFacade } from "@swirl/lib/docs/src/ApiDocumentationsFacade";
import { FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { NavItem } from "@swirl/lib/navigation";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { GetStaticProps } from "next";
import Head from "next/head";
import { CodePreview } from "src/components/CodePreview";
import ApiGrid from "src/components/Documentation/ApiGrid";
import ApiTile from "src/components/Documentation/ApiTile";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { Text } from "src/components/swirl-recreations";

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
    params: { apiDoc: item.url.split("/").slice(-1)[0] },
  }));
  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { apiDoc } = context.params;

  const navItems = await ApiDocumentationsFacade.navItems;

  try {
    const data = await getComponentData(apiDoc);
    return {
      props: {
        document: data.document,
        frontMatter: data.frontMatter,
        navItems,
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
            components: generateMdxThemeComponents(),
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

function generateMdxThemeComponents() {
  return {
    section: (props) => <section className="mb-8 last:mb-0" {...props} />,
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
      <ul
        className="mb-8 last:mb-0 leading-line-height-xl list-disc"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mb-8 last:mb-0 leading-line-height-xl list-decimal"
        {...props}
      />
    ),
    li: (props) => <li className="ml-4" {...props} />,
    p: (props) => <Text className="mb-8 last:mb-0" {...props} />,
    code: (props) => {
      const { className, children } = props;

      if (className?.includes("language-") && typeof children === "string") {
        return (
          <CodePreview
            disableHeader
            className="mb-4 last:mb-0"
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
      <H2 className="mb-6 last:mb-0" {...props} href={`#${props.id}`} />
    ),
    h2: (props: any) => (
      <H2 className="mb-6 last:mb-0" {...props} href={`#${props.id}`} />
    ),
    h3: (props: any) => (
      <H3 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
    ),
    h4: (props: any) => (
      <H4 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
    ),
    h5: (props: any) => (
      <H4 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
    ),
    h6: (props: any) => (
      <H4 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
    ),
    hr: (props) => <hr className="my-8" {...props} />,
    ApiGrid: (props: any) => <ApiGrid {...props} />,
    ApiTile: (props: any) => <ApiTile {...props} />,
  } as MDXRemoteProps["components"];
}
