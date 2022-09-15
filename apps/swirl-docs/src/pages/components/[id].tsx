import { generateComponentsLinkList } from "@swirl/lib/docs";
import {
  createDocLinkList,
  generateMdxFromStorybook,
} from "@swirl/lib/docs/src/singleDoc";
import { MDXRemote } from "next-mdx-remote";
import IframeResizer from "iframe-resizer-react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import Head from "next/head";

async function getComponentData(id: string) {
  return await generateMdxFromStorybook(id);
}

export async function getStaticPaths() {
  const swirlComponentLinks = generateComponentsLinkList("components").map(
    (component) => ({
      params: {
        id: component.htmlTag,
      },
    })
  );

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
    h1: (props: any) => {
      return <h1 id={props.children.toLowerCase()}>{props.children}</h1>;
    },
    h2: (props: any) => {
      return <h2 id={props.children.toLowerCase()}>{props.children}</h2>;
    },
    h3: (props: any) => {
      return <h3 id={props.children.toLowerCase()}>{props.children}</h3>;
    },
    h4: (props: any) => {
      return <h4 id={props.children.toLowerCase()}>{props.children}</h4>;
    },
    h5: (props: any) => {
      return <h5 id={props.children.toLowerCase()}>{props.children}</h5>;
    },
    h6: (props: any) => {
      return <h6 id={props.children.toLowerCase()}>{props.children}</h6>;
    },
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
