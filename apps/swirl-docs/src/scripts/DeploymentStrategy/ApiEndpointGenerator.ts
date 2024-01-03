import { API_SPEC_PATH } from "@swirl/lib/navigation";

import { ApiDocumentationsFacade } from "@swirl/lib/docs/src/ApiDocumentationsFacade";
import fs, { writeFileSync } from "fs";
import prettier from "prettier";

export class ApiEndpointGenerator {
  public async generate(): Promise<void> {
    console.log("Generating API Spec Navigation...");
    try {
      if (fs.existsSync(API_SPEC_PATH)) {
        const docs = await ApiDocumentationsFacade.apiDocumentations;

        writeFileSync(
          "./src/lib/navigation/src/data/apiEndpoints.data.ts",
          prettier.format(
            this.createDataString(
              JSON.stringify(docs, (k, v) => {
                return k === "x-readme-ref-name" ? undefined : v;
              })
            ),
            {
              parser: "typescript",
            }
          ),
          "utf8"
        );

        console.log(`API Endpoint Documentation Done! 🚀`);
      }
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }

  private createDataString(data: string): string {
    return `
    import { ApiDocumentation } from "@swirl/lib/docs";

    export const apiEndpointDocumentation =
      ${data} as ApiDocumentation[]
    ;
    `;
  }
}
