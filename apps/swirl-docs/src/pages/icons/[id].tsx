import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { MDXRemote } from "next-mdx-remote";
import IframeResizer from "iframe-resizer-react";
import { DocCategory, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "src/components/Layout/DocumentationLayout";
import { createLinkLists } from "@swirl/lib/docs/src/links";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { navItems } from "@swirl/lib/navigation";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation("icons", document);
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData("icons");

  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const document = await getComponentData(context.params.id);
  const { documentLinkList } = createLinkLists("icons", context.params.id);

  return {
    props: {
      document,
      documentLinkList,
      title: context.params.id,
    },
  };
}

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
    ...LinkedHeaders,
  };

  console.log(documentLinkList);
  return (
    <>
      <Head>
        <title>Swirl Components | {title}</title>
      </Head>
      <DocumentationLayout
        categoryLinkList={navItems[2].children}
        documentLinkList={documentLinkList}
      >
        <main className="flex flex-col justify-center items-center">
          <article className="max-w-3xl px-4 mt-6">
            <MDXRemote {...document} components={components} />
          </article>
        </main>
      </DocumentationLayout>
    </>
  );
}
