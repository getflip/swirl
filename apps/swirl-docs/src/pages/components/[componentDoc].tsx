import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import {
  DOCUMENTATION_CATEGORY,
  FrontMatter,
} from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { componentsNavItems } from "@swirl/lib/navigation/src/data/components.data";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { createStaticPathsData } from "@swirl/lib/docs";
import { ScriptProps } from "next/script";
import { GetStaticProps } from "next";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";

async function getComponentData(document: string) {
  const serializedDocument = await generateMdxFromDocumentation(
    DOCUMENTATION_CATEGORY.COMPONENTS,
    document
  );
  return {
    document: serializedDocument,
    frontMatter: serializedDocument.frontmatter,
  };
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData(DOCUMENTATION_CATEGORY.COMPONENTS);

  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { componentDoc: string }
> = async (context: any) => {
  const { componentDoc } = context.params;

  const data = await getComponentData(componentDoc);
  const componentsJsonPath = path.join(
    process.cwd(),
    "../../",
    "packages",
    "swirl-components",
    "components.json"
  );

  const componentsJson = JSON.parse(
    fs.readFileSync(componentsJsonPath, "utf-8")
  );

  return {
    props: {
      document: data.document,
      frontMatter: data.frontMatter,
      title: componentDoc,
      componentsJson,
    },
  };
};

export default function Component({
  document,
  frontMatter,
  componentsJson,
}: {
  title: string;
  document: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  frontMatter: FrontMatter;
  componentsJson: any;
}) {
  const components = {
    ...LinkedHeaders,
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
          navigationLinks: componentsNavItems,
          frontMatter,
          componentsJSON: componentsJson,
        }}
        header={<DocumentationLayout.Header />}
        content={
          <>
            <DocumentationLayout.ComponentPreview />
            <DocumentationLayout.MDX />
          </>
        }
      />
    </>
  );
}
