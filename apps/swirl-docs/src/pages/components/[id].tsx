import { generateComponentsLinkList } from "@swirl/lib/docs";
import {
  createDocLinkList,
  generateMdxFromStorybook,
} from "@swirl/lib/docs/src/singleDoc";
import { MDXRemote } from "next-mdx-remote";
import { ArgsTable, Canvas, Meta, Story } from "@storybook/addon-docs";
import IframeResizer from "iframe-resizer-react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";

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

  console.log("links", links);

  return {
    props: { component, links },
  };
}

export default function Component({
  component,
  links,
}: {
  component: any;
  links: DocHeadline[];
}) {
  const components = {
    IframeResizer,
    h2: (props: any) => {
      console.log("h2", props);
      return <h2 id={props.children.toLowerCase()}>{props.children}</h2>;
    },
  };
  return (
    <main>
      <nav>
        <ul className="list-disc">
          {links.map((link: DocHeadline) => {
            return (
              <li key={link.id}>
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
  );
}
