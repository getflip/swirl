import { ApiDocumentation } from "@swirl/lib/docs";
import { API_SPEC_PATH } from "@swirl/lib/navigation";

import { writeFileSync } from "fs";
import OASNormalize from "oas-normalize";
import prettier from "prettier";
import OASBuilder from "../ApiDocumentation/oasBuilder";

export class ApiEndpointGenerator {
  private async generateApiDocumentations() {
    const oasDocument = await new OASNormalize(`${API_SPEC_PATH}/merged.yml`, {
      enablePaths: true,
    }).validate();

    const oasBuilder = await new OASBuilder(oasDocument).dereference();
    return oasBuilder.setApiDocumentations().apiDocumentations;
  }

  public async generate(): Promise<ApiDocumentation[]> {
    console.log("Generating API Endpoint Documentation...");
    try {
      const apiDocumentations = await this.generateApiDocumentations();

      writeFileSync(
        "./src/lib/navigation/src/data/apiEndpoints.data.ts",
        prettier.format(
          this.createDataString(
            JSON.stringify(apiDocumentations, (k, v) => {
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

      return apiDocumentations;
    } catch (error) {
      console.error("Error reading directory:", error);
      throw error;
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
