import type { NavItem } from "@swirl/lib/navigation";

import type { ApiDocumentation } from "@swirl/lib/docs";
import { sort } from "fast-sort";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import prettier from "prettier";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import sectionize from "remark-sectionize";

export const API_DOCS_PATH = path.resolve(`${process.cwd()}/src/documents/api`);

export function serializeMarkdownString(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm, sectionize],
      format: "mdx",
    },
  });
}

export class ApiSpecsNavigationGenerator {
  public async generate(apiDocumentations: ApiDocumentation[]): Promise<void> {
    console.log("Generating API Spec Navigation...");

    try {
      const apiNavItem = await this.generateAPINavItem(apiDocumentations);

      const dataString = apiNavItem.children
        ?.map((navItem) => JSON.stringify(navItem))
        .join(",");

      const apiSpecsData = this.createDataString(dataString || "");

      fs.writeFileSync(
        "./src/lib/navigation/src/data/apiSpecs.data.ts",
        prettier.format(apiSpecsData, { parser: "typescript" }),
        "utf8"
      );

      console.log(`API Spec Navigation Done! 🚀`);
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }

  private createDataString(data: string): string {
    return `
    import { NavItem } from "../navigation.model";

    export const apiSpecsNavItems: NavItem[] = [
      ${data}
    ];
    `;
  }

  private async generateAPINavItem(
    apiDocumentations: ApiDocumentation[]
  ): Promise<NavItem> {
    console.log("Generating navigation for API");

    return {
      title: "API",
      url: `/api-docs`,
      children: apiDocumentations.map((api) => ({
        title: api.title,
        url: `/api-docs/${api.id}/${api.resources[0].id}`,
        children: api.resources.map((resource) => {
          return {
            children: resource.endpoints.map((endpoint) => ({
              title: endpoint.title,
              tag: endpoint.method,
              url: `/api-docs/${api.id}/${resource.id}#${endpoint.id}`,
            })),
            title: resource.title,
            url: `/api-docs/${api.id}/${resource.id}`,
          };
        }),
        specName: api.id,
        description: "",
      })),
    };
  }
}

export class ApiDocsNavigationGenerator {
  public async generate(): Promise<void> {
    if (fs.existsSync(API_DOCS_PATH)) {
      const files = fs.readdirSync(API_DOCS_PATH);

      const filesWithPaths = await this.generateFileList(sort(files).asc());

      const dataString = filesWithPaths
        .map((navItem) => JSON.stringify(navItem))
        .join(",");
      const apiDocsData = this.createDataString(dataString);

      fs.writeFileSync(
        "./src/lib/navigation/src/data/apiDocs.data.ts",
        prettier.format(apiDocsData, { parser: "typescript" }),
        "utf8"
      );
      console.log("API Docs Navigation Done! 🚀");
    } else {
      console.log(
        "No API docs found. Skipping generation of API docs navigation."
      );
    }
  }

  private createDataString(data: string): string {
    return `
    import { NavItem } from "../navigation.model";

    export const apiDocsNavItems: NavItem[] = [
      ${data}
    ];
    `;
  }

  private async generateFileList(
    paths: string[],
    rootPath?: string
  ): Promise<NavItem[]> {
    const filteredPaths = paths.filter((pathItem) => {
      const fullPath = rootPath ? `${rootPath}/${pathItem}` : pathItem;
      const absolutePath = path.join(API_DOCS_PATH, fullPath);

      return (
        !fs.statSync(absolutePath).isDirectory() &&
        !fullPath.includes(".gitkeep")
      );
    });

    const items = (await Promise.all(
      filteredPaths.map(async (pathItem) => {
        const fullPath = rootPath ? `${rootPath}/${pathItem}` : pathItem;
        const absolutePath = path.join(API_DOCS_PATH, fullPath);
        const source = fs.readFileSync(absolutePath, "utf8");
        const md = await serializeMarkdownString(source);

        return this.generateNavItems(fullPath, md.frontmatter?.title);
      })
    )) as NavItem[];

    return items;
  }

  private generateNavItems(filePath: string, title?: string): NavItem {
    const cleanedFileName = filePath
      .replace(".mdx", "")
      .replace(/^[0-9]+-/, "");
    return {
      title: title || cleanedFileName,
      mdxFilename: filePath.replace(".mdx", ""),
      url: `/api-docs/docs/${cleanedFileName}`,
    };
  }
}
