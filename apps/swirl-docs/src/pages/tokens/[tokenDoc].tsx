import {
  DOCUMENTATION_CATEGORY,
  FrontMatter,
} from "@swirl/lib/docs/src/docs.model";
import { H2, LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";

import { BorderTokens } from "src/components/Tokens/BorderTokens";
import { ColorTokens } from "src/components/Tokens/ColorTokens";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ScriptProps } from "next/script";
import { SpacingTokens } from "src/components/Tokens/SpacingTokens";
import TokensList from "src/components/Tokens/TokensList";
import { TypographyTokens } from "src/components/Tokens/TypographyTokens";
import { ZIndexTokens } from "src/components/Tokens/ZIndexTokens";
import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { isProd } from "@swirl/lib/env";
import { tokensNavItems } from "@swirl/lib/navigation/src/data/tokens.data";
import { useRouter } from "next/router";

async function getComponentData(document: string) {
  const serializedDocument = await generateMdxFromDocumentation(
    DOCUMENTATION_CATEGORY.TOKENS,
    document,
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
  const router = useRouter();
  const host = isProd ? "https://getflip.dev" : "http://localhost:3000";
  const path = `${host}${router.route.replace("[tokenDoc]", "")}${title}`;
  const components = {
    TokensList,
    ColorTokens,
    BorderTokens,
    SpacingTokens,
    TypographyTokens,
    ZIndexTokens,
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
    h2: (props: any) => <H2 {...props} href={`${path}#${props.id}`} />,
  } as MDXRemoteProps["components"];

  return (
    <>
      <Head>
        <title>{`${document.frontmatter?.title} — Swirl`}</title>
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
