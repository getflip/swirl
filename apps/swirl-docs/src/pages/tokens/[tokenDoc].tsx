import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import {
  DOCUMENTATION_CATEGORY,
  FrontMatter,
} from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import TokensList from "src/components/Tokens/TokensList";
import { ColorTokens } from "src/components/Tokens/ColorTokens";
import { TypographyTokens } from "src/components/Tokens/TypographyTokens";
import { BorderTokens } from "src/components/Tokens/BorderTokens";
import { SpacingTokens } from "src/components/Tokens/SpacingTokens";
import { ZIndexTokens } from "src/components/Tokens/ZIndexTokens";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { tokensNavItems } from "@swirl/lib/navigation/src/data/tokens.data";
import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";

async function getComponentData(document: string) {
  const serializedDocument = await generateMdxFromDocumentation(
    DOCUMENTATION_CATEGORY.TOKENS,
    document
  );
  return {
    document: serializedDocument,
    frontMatter: serializedDocument.frontmatter,
  };
}

export const getStaticPaths = async () => {
  const categoryDocs = createStaticPathsData(DOCUMENTATION_CATEGORY.TOKENS);

  return {
    fallback: false,
    paths: categoryDocs,
  };
};

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { tokenDoc: string }
> = async (context: any) => {
  const { tokenDoc } = context.params;

  const data = await getComponentData(tokenDoc);

  return {
    props: {
      document: data.document,
      frontMatter: data.frontMatter,
      title: tokenDoc,
    },
  };
};

export default function Component({
  document,
  frontMatter,
  title,
}: {
  document: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
  title: string;
}) {
  const components = {
    TokensList,
    ColorTokens,
    BorderTokens,
    SpacingTokens,
    TypographyTokens,
    ZIndexTokens,
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  } as MDXRemoteProps["components"];

  return (
    <>
      <Head>
        <title>{`Swirl | ${title}`}</title>
      </Head>
      <DocumentationLayout
        header={<DocumentationLayout.Header />}
        content={<DocumentationLayout.MDX />}
        data={{
          mdxContent: {
            document,
            components,
          },
          frontMatter,
          navigationLinks: tokensNavItems,
        }}
      />
    </>
  );
}
