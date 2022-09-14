import { generateComponentsLinkList } from "@swirl/lib/docs";
import { generateMdxFromStorybook } from "@swirl/lib/docs/src/singleDoc";
import { MDXRemote } from "next-mdx-remote";
import { ArgsTable, Canvas, Meta, Story } from "@storybook/addon-docs";
import IframeResizer from "iframe-resizer-react";

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
  return {
    props: { component },
  };
}

export default function Component({ component }: any) {
  const components = {
    IframeResizer,
  };
  return (
    <main>
      <section className="flex flex-col justify-center items-center h-full w-screen">
        <div className="prose">
          <MDXRemote {...component} components={components} />
        </div>
      </section>
    </main>
  );
}
