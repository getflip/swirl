import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import {
  BASE_PATHS,
  DOCUMENT_ENUM,
  DocHeadline,
} from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { createLinkLists } from "@swirl/lib/docs/src/links";
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
  return await generateMdxFromDocumentation(BASE_PATHS.TOKENS, document);
}

export const getStaticPaths = async () => {
  // TODO: refactor this to use enums for the token params
  const categoryDocs = createStaticPathsData(
    BASE_PATHS.TOKENS,
    DOCUMENT_ENUM.TOKENS
  );

  return {
    fallback: false,
    paths: categoryDocs,
  };
};

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { tokenDoc: string }
> = async (context: any) => {
  // TODO: how to type the component
  const { tokenDoc } = context.params;

  // refactor to pass in token slug as path rather than hardcoding !!
  const { documentLinkList } = createLinkLists(BASE_PATHS.TOKENS, tokenDoc);
  const document = await getComponentData(tokenDoc);

  return {
    props: {
      document,
      documentLinkList,
      title: tokenDoc,
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
        documentLinkList={documentLinkList}
        document={document}
        mdxComponents={components}
        frontMatter={document.frontmatter}
      />
    </>
  );
}
