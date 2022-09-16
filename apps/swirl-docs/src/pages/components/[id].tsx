import {
  createDocLinkList,
  generateMdxFromStorybook,
} from "@swirl/lib/docs/src/singleDoc";
import { BASE_PATHS, DocHeadline } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";
import IframeResizer from "iframe-resizer-react";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { MDXRemote } from "next-mdx-remote";
import { createSwirlComponentDocCategories } from "@swirl/lib/docs";

async function getComponentData(id: string) {
  return await generateMdxFromStorybook(id);
}

export async function getStaticPaths() {
  const swirlComponentLinks = createSwirlComponentDocCategories(
    BASE_PATHS.COMPONENTS
  ).map((component) => ({
    params: {
      id: component.htmlTag,
    },
  }));

  return {
    paths: swirlComponentLinks,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const component = await getComponentData(context.params.id);
  const links = createDocLinkList(context.params.id);

  return {
    props: { component, links, title: context.params.id },
  };
}

export default function Component({
  component,
  links,
  title,
}: {
  component: any;
  links: DocHeadline[];
  title: string;
}) {
  const components = {
    IframeResizer,
    ...LinkedHeaders,
  };
  return (
    <>
      <Head>
        <title>Swirl Components | {title}</title>
      </Head>
      <main>
        <nav>
          <ul className="list-disc">
            {links.map((link: DocHeadline) => {
              return (
                <li key={link.id} className="list-disc">
                  <a href={`#${link.id}`}>{link.name}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <section className="flex flex-col justify-center items-center h-full w-screen">
          <div className="prose">
            <MDXRemote {...component} components={components} />
          </div>
        </section>
      </main>
    </>
  );
}
