import {
  createDocLinkList,
  generateMdxFromStorybook,
} from "@swirl/lib/docs/src/singleDoc";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import IframeResizer from "iframe-resizer-react";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { CategoryNav } from "src/components/Layout/CategoryNav";
import { DocLinksNav } from "src/components/Layout/DocLinksNav";
import Footer from "src/components/Layout/Footer";
import { navItems } from "@swirl/lib/navigation";
import { componentsNavItems } from "@swirl/lib/navigation/src/data/components.data";

// async function getComponentData(id: string) {
//   return await generateMdxFromStorybook(id);
// }

export async function getStaticPaths() {
  const swirlComponentLinks = componentsNavItems.map((component) => ({
    params: {
      id: component.url.replace("/components/", ""),
    },
  }));

  return {
    paths: swirlComponentLinks,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  // const document = await getComponentData(context.params.id);
  // const links = createDocLinkList(context.params.id);

  return {
    props: { title: context.params.id },
  };
}

export default function Component({ title }: { title: string }) {
  const components = {
    ...LinkedHeaders,
    IframeResizer,
  };

  console.log("links", title);
  return (
    <>
      <Head>
        <title>Swirl | Components</title>
      </Head>
      <div className="flex justify-center items-center h-screen w-screen felx">
        <span>😥</span>
        <p>will be implemented soon...</p>
        {/* <CategoryNav categoryLinkList={navItems[1].children} />
        <main
          id="main"
          className="col-span-8 flex flex-col justify-center items-center"
        >
          <article className="max-w-3xl px-4 mt-6">
            <MDXRemote {...document} components={components} />
          </article>
          {title}
        </main>
        <DocLinksNav documentLinkList={links} />
        <Footer /> */}
      </div>
    </>
  );
}
