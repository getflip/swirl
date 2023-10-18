import fs from "fs";
import OASNormalize from "oas-normalize";
import OASBuilder from "@swirl/lib/docs/src/oasBuilderSetup";
import { API_DOCS_PATH, API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
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
        const specs = fs
          .readdirSync(API_SPEC_PATH)
          .filter((file) => file.includes(".yml"));

        console.log("available specs", specs);

        const navItems = await Promise.all(
          specs.map((spec) => this.generateNavItems(spec))
        );

        const dataString = navItems
          .map((navItem) => JSON.stringify(navItem))
          .join(",");
        const apiSpecsData = this.createDataString(dataString);

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

  private async generateNavItems(specName: string): Promise<NavItem> {
    console.log("Generating navigation for", specName);
    const specPath = `${API_SPEC_PATH}/${specName}`;

    // write a check to see if the file at the end exists if not skip
    if (!fs.existsSync(specPath)) {
      throw new Error(`Spec file ${specPath} does not exist!`);
    }

    const oasDocument = await new OASNormalize(specPath, {
      enablePaths: true,
    }).validate();

    const oasBuilder = new OASBuilder(oasDocument)
      .setTitleAndPath()
      .setDescription()
      .setEndpoints()
      .setOperations()
      .setTags();

    const operationNavItems: NavItem[] =
      oasBuilder.operationsList?.map((endpoint) => ({
        title: endpoint.title,
        url: `/api-docs${endpoint.path}`,
        description: endpoint.operation.method,
        isRoot: false,
      })) || [];

    return {
      title: oasBuilder.title,
      url: `/api-docs/${oasBuilder.path}`,
      isRoot: true,
      children: operationNavItems,
      specName,
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
      const absolutePath = path.join(API_DOCS_PATH, fullPath);

      const isSubdirectory = fs.statSync(absolutePath).isDirectory();

      // for now no subdirectories
      if (isSubdirectory && !rootPath) {
        console.log("subdirectories currently not supported", fullPath);
        // const subdirectoryPaths = fs.readdirSync(absolutePath);
        // const children = generateFileList(subdirectoryPaths, fullPath);

        // // Here, consider the directory itself as a NavItem and the files in it as children.
        // return {
        //   title: path.basename(fullPath),
        //   url: `/api-docs/docs/${fullPath}`,
        //   isRoot: rootPath ? false : true,
        //   children,
        // };
      }

      if (!isSubdirectory) {
        return this.generateNavItems(fullPath);
      }
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
