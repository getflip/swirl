import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { DOCUMENTATION_CATEGORY } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import TokensList from "src/components/Tokens/TokensList";
import { ColorTokens } from "src/components/Tokens/ColorTokens";
import { TypographyTokens } from "src/components/Tokens/TypographyTokens";
import { BorderTokens } from "src/components/Tokens/BorderTokens";
import { SpacingTokens } from "src/components/Tokens/SpacingTokens";
import { ZIndexTokens } from "src/components/Tokens/ZIndexTokens";
import { tokensNavItems } from "@swirl/lib/navigation/src/data/tokens.data";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation(
    DOCUMENTATION_CATEGORY.TOKENS,
    document
  );
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

  const document = await getComponentData(tokenDoc);

  return {
    props: {
      document,
      title: tokenDoc,
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
    TokensList,
    ColorTokens,
    BorderTokens,
    SpacingTokens,
    TypographyTokens,
    ZIndexTokens,
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  };

  return (
    <>
      <Head>
        <title>{`Swirl | ${title}`}</title>
      </Head>
      <DocumentationLayout
        categoryLinkList={tokensNavItems}
        document={document}
        mdxComponents={components}
        frontMatter={document.frontmatter}
      />
    </>
  );
}
