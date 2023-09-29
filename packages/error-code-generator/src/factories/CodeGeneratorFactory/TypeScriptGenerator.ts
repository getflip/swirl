import { CodeGenerator } from ".";

import { EndpointErrorCollection, GeneratedCode } from "../../types";

export class TypeScriptGenerator implements CodeGenerator {
  private refNames: Array<string> = [];
  private endpointErrorCollection: EndpointErrorCollection;

  constructor(errorCodes: EndpointErrorCollection) {
    this.endpointErrorCollection = errorCodes;
    this.endpointErrorCollection.errorCodes?.forEach((errorCode) => {
      if (errorCode) {
        this.refNames.push(errorCode["x-readme-ref-name"]);
      }
    });
  }

  generateCode(): GeneratedCode {
    return {
      endpoint: this.endpointErrorCollection.endpoint,
      language: "TypeScript",
      code: this.generate(),
    };
  }

  private generate() {
    const summaryErrorObject: string = this.generateSummaryErrorCodeObject();
    const endpointErrorType: string = this.generateEndpointErrorType();

    let errorObjects = "";

    if (this.endpointErrorCollection.errorCodes) {
      errorObjects += this.endpointErrorCollection.errorCodes
        ?.map((errorCode) => {
          if (errorCode) {
            return this.createErrorAsConstObject(
              errorCode["x-readme-ref-name"],
              errorCode.enum
            );
          }
          return "";
        })
        .join("\n");
    }

    return `
        ${errorObjects}
        ${summaryErrorObject}
        ${endpointErrorType}
      `;
  }

  private createErrorAsConstObject(variableName: string, errorCodes: string[]) {
    const mapObject = Object.fromEntries(
      errorCodes.map((error) => [error, error])
    );
    return `const ${variableName} = ${JSON.stringify(
      mapObject,
      null,
      2
    )} as const;`;
  }

  private generateSummaryErrorCodeObject(): string {
    let code = `export const ${this.endpointErrorCollection.endpoint}ErrorCodes = {\n`;

    this.refNames.forEach((category) => {
      code += `  ...${category},\n`;
    });

    code += "} as const;";

    return code;
  }

  private generateEndpointErrorType() {
    return `export type ${this.endpointErrorCollection.endpoint}Error = keyof typeof ${this.endpointErrorCollection.endpoint}ErrorCodes;`;
  }
}
