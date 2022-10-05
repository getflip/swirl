import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { MDXRemote } from "next-mdx-remote";
import { BASE_PATHS, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { createLinkLists } from "@swirl/lib/docs/src/links";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import TokensList from "src/components/Tokens/TokensList";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation("tokens", document);
}

export async function getStaticPaths() {
  const categoryDocs = createStaticPathsData(BASE_PATHS.TOKENS);

  return {
    paths: categoryDocs,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { documentLinkList } = createLinkLists(
    BASE_PATHS.TOKENS,
    context.params.id
  );
  const document = await getComponentData(context.params.id);

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
    TokensList,
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  };
  return (
    <>
      <Head>
        <title>Swirl Components | {title}</title>
      </Head>
      <DocumentationLayout documentLinkList={documentLinkList}>
        <main className="flex flex-col justify-center items-center">
          <article className="max-w-3xl px-4 mt-6">
            <MDXRemote {...document} components={components} />
          </article>
        </main>
      </DocumentationLayout>
    </>
  );
}
