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
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import OASNormalize from "oas-normalize";
import Oas from "oas";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation("apiDocs", document);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryDocs = createStaticPathsData("apiDocs");

  return {
    fallback: false,
    paths: categoryDocs,
  };
};

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { tokenDoc: string }
> = async (context: any) => {
  const { apiDoc } = context.params;

  const document = await getComponentData(apiDoc);

  const oasYaml = new OASNormalize(`./specs/${apiDoc}.yaml`, {
    enablePaths: true,
  });

  const definition = await oasYaml.validate();

  return {
    props: {
      document,
      title: apiDoc,
      definition,
    },
  };
};

export default function Component({
  document,
  title,
  definition,
}: {
  document: any;
  title: string;
  definition: unknown;
}) {
  const components = {
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  };

  console.log("definition", definition);

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
