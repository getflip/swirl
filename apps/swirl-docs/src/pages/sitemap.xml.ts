import { navItems } from "@swirl/lib/navigation";

function generateSiteMap(paths: string[]) {
  const baseUrl = "https://getflip.dev";

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${paths
       .map((path) => {
         return `
       <url>
           <loc>${`${baseUrl}${path}`}</loc>
           <changefreq>weekly</changefreq>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  const paths: string[] = [];

  navItems.forEach((item) => {
    paths.push(item.url);
    if (item.children) {
      item.children.forEach((child) => {
        paths.push(child.url);
      });
    }
  });

  const filteredPaths = paths.filter((path) => !path.includes("foundations"));

  const sitemap = generateSiteMap(filteredPaths);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
