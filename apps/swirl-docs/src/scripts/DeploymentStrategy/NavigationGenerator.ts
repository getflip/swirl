import { API_DOCS_PATH, API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";

import { ApiDocumentationsFacade } from "@swirl/lib/docs/src/ApiDocumentationsFacade";
import fs from "fs";
import path from "path";
import prettier from "prettier";

// Strategy Interface
interface NavigationGeneratorStrategy {
  generate(): Promise<void>;
}

export class ApiSpecsNavigationGenerator
  implements NavigationGeneratorStrategy
{
  public async generate(): Promise<void> {
    console.log("Generating API Spec Navigation...");
    try {
      if (fs.existsSync(API_SPEC_PATH)) {
        const apiNavItem = await this.generateAPINavItem();

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
      }
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

  private async generateAPINavItem(): Promise<NavItem> {
    console.log("Generating navigation for API");

    return {
      title: "API",
      url: `/api-docs`,
      isRoot: true,
      children: await ApiDocumentationsFacade.navItems,
    };
  }
}

export class ApiDocsNavigationGenerator implements NavigationGeneratorStrategy {
  public async generate(): Promise<void> {
    if (fs.existsSync(API_DOCS_PATH)) {
      const files = fs.readdirSync(API_DOCS_PATH);

      const filesWithPaths = this.generateFileList(files);

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

  private generateFileList(paths: string[], rootPath?: string): NavItem[] {
    const filteredPaths = paths.filter((pathItem) => {
      const fullPath = rootPath ? `${rootPath}/${pathItem}` : pathItem;
      const absolutePath = path.join(API_DOCS_PATH, fullPath);

      return (
        !fs.statSync(absolutePath).isDirectory() &&
        !fullPath.includes(".gitkeep")
      );
    });

    const items = filteredPaths.map((pathItem) => {
      const fullPath = rootPath ? `${rootPath}/${pathItem}` : pathItem;
      return this.generateNavItems(fullPath);
    }) as NavItem[];

    return items;
  }

  private generateNavItems(filePath: string): NavItem {
    const cleanedFileName = filePath.replace(".mdx", "");
    return {
      title: cleanedFileName,
      url: `/api-docs/docs/${cleanedFileName}`,
    };
  }
}
