// import {
//   createDocLinkList,
//   generateMdxFromStorybook,
// } from "@swirl/lib/docs/src/singleDoc";
// import { BASE_PATHS, DocHeadline } from "@swirl/lib/docs/src/docs.model";
// import Head from "next/head";
// import IframeResizer from "iframe-resizer-react";
// import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
// import { MDXRemote } from "next-mdx-remote";
// import { createSwirlComponentDocCategories } from "@swirl/lib/docs";
// import { CategoryNav } from "src/components/Layout/CategoryNav";
// import { DocLinksNav } from "src/components/Layout/DocLinksNav";
// import Footer from "src/components/Layout/Footer";
// import { NavItem, navItems } from "@swirl/lib/navigation";

// async function getComponentData(id: string) {
//   return await generateMdxFromStorybook(id);
// }

// export async function getStaticPaths() {
//   const swirlComponentLinks = createSwirlComponentDocCategories(
//     BASE_PATHS.COMPONENTS
//   ).map((component) => ({
//     params: {
//       id: component.htmlTag,
//     },
//   }));

//   return {
//     paths: swirlComponentLinks,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context: any) {
//   const document = await getComponentData(context.params.id);
//   const links = createDocLinkList(context.params.id);

//   return {
//     props: { document, links, title: context.params.id },
//   };
// }

// export default function Component({
//   document,
//   links,
// }: {
//   document: any;
//   links: DocHeadline[];
//   title: string;
// }) {
//   const components = {
//     ...LinkedHeaders,
//     IframeResizer,
//   };
//   return (
//     <>
//       <Head>
//         <title>Swirl | Components</title>
//       </Head>
//       <div className="grid grid-cols-1 md:grid-cols-12 h-full">
//         <CategoryNav categoryLinkList={navItems[1].children} />
//         <main
//           id="main"
//           className="col-span-8 flex flex-col justify-center items-center"
//         >
//           <article className="max-w-3xl px-4 mt-6">
//             <MDXRemote {...document} components={components} />
//           </article>
//         </main>
//         <DocLinksNav documentLinkList={links} />
//         <Footer />
//       </div>
//     </>
//   );
// }

export default function Component() {
  return <h1>Component</h1>;
}
