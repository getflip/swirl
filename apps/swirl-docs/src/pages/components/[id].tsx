// pages/posts/[id].js

import { generateComponentsLinkList } from "@swirl/lib/docs";
import { generateMdxFromStorybook } from "@swirl/lib/docs/src/singleDoc";
import { generateSwirlComponentsPath } from "@swirl/lib/navigation";
import { MDXRemote } from "next-mdx-remote";

async function getComponentData(id: string) {
  return await generateMdxFromStorybook(generateSwirlComponentsPath(id));
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
  return (
    <main>
      <section className="flex flex-col justify-center items-center h-full w-screen">
        <div className="prose">
          <MDXRemote {...component} />
        </div>
      </section>
    </main>
  );
}
