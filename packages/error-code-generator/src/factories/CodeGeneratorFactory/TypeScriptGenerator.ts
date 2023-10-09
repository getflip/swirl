import { CodeGeneratorWithIndex } from ".";
import { EndpointErrorCollection, GeneratedCode } from "../../types";

export class TypeScriptGenerator implements CodeGeneratorWithIndex {
  language = "TypeScript";
  fileExtension: string = "ts";
  hasIndexFileRendering: true = true;

  indexFileConfig: GeneratedCode = {
    endpoint: "index",
    language: this.language,
    code: "",
  };

  private refNames: Array<string> = [];
  private endpointErrorCollection?: EndpointErrorCollection;
  private endpointErrorTypeString?: string;
  private endpointErrorCodesTypeString?: string;

  private endpointErrorTypeStringCache: Array<string> = [];
  private endpointErrorCodesTypeStringCache: Array<string> = [];

  private endpointErrorStringsCache: Map<string, Array<string>> = new Map();

  setEndpointErrorCollection(errorCollection: EndpointErrorCollection) {
    this.endpointErrorCollection = errorCollection;
    this.endpointErrorCollection.errorCodes?.forEach((errorCode) => {
      if (errorCode) {
        this.refNames.push(errorCode["x-readme-ref-name"]);
      }
    });
    this.endpointErrorCodesTypeString = `${this.endpointErrorCollection.endpoint}ErrorCodes`;
    this.endpointErrorTypeString = `${this.endpointErrorCollection.endpoint}Error`;

    return this;
  }

  generateCode(): GeneratedCode {
    if (!this.endpointErrorCollection) {
      throw new Error("No endpoint error collection provided");
    }

    const generatedCode: GeneratedCode = {
      endpoint: this.endpointErrorCollection.endpoint,
      language: this.language,
      code: this.generate(),
    };

    this.resetGenerator();
    return generatedCode;
  }

  private generate() {
    const summaryErrorObject: string = this.generateSummaryErrorCodeObject();
    const endpointErrorType: string = this.generateEndpointErrorType();

    let errorObjects = "";

    if (this.endpointErrorCollection?.errorCodes) {
      errorObjects += this.endpointErrorCollection.errorCodes
        ?.map((errorCode) => {
          if (errorCode) {
            return this.createErrorAsConstObject(
              errorCode["x-readme-ref-name"],
              errorCode.enum,
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
      errorCodes.map((error) => [error, error]),
    );
    return `const ${variableName} = ${JSON.stringify(
      mapObject,
      null,
      2,
    )} as const;`;
  }

  private generateSummaryErrorCodeObject(): string {
    let code = `export const ${this.endpointErrorCodesTypeString} = {\n`;

    this.refNames.forEach((category) => {
      code += `  ...${category},\n`;
    });

    code += "} as const;";

    return code;
  }

  private generateEndpointErrorType() {
    return `export type ${this.endpointErrorTypeString} = keyof typeof ${this.endpointErrorCodesTypeString};`;
  }

  private resetGenerator() {
    this.endpointErrorTypeStringCache.push(this.endpointErrorTypeString!);
    this.endpointErrorCodesTypeStringCache.push(
      this.endpointErrorCodesTypeString!,
    );

    this.endpointErrorStringsCache.set(
      this.endpointErrorCollection?.endpoint!!,
      [this.endpointErrorTypeString!, this.endpointErrorCodesTypeString!],
    );

    this.endpointErrorTypeString = undefined;
    this.endpointErrorCodesTypeString = undefined;
    this.refNames = [];
    this.endpointErrorCollection = undefined;
  }

  private generateServerErrorCodeType() {
    const serverErrorCodeIndexUnion =
      this.endpointErrorTypeStringCache.join(" | ");

    return `export type ServerErrorCode = ${serverErrorCodeIndexUnion};`;
  }

  private generateAllServerErrorCodesString() {
    let code = `export const AllServerErrorCodes = {\n`;

    this.endpointErrorCodesTypeStringCache.forEach((type) => {
      code += `  ...${type},\n`;
    });

    code += "} as const;";

    return code;
  }

  private generateServerErrorCodeImports() {
    const cummulatedImports: string[] = [];

    for (const key of this.endpointErrorStringsCache.keys()) {
      const [endpointErrorTypeString, endpointErrorCodesTypeString] =
        this.endpointErrorStringsCache.get(key)!!;

      cummulatedImports.push(
        `import { ${endpointErrorTypeString}, ${endpointErrorCodesTypeString} } from "./${key}";`,
      );
    }

    return cummulatedImports.join("\n");
  }

  generateCummulatedServerErrorCodes() {
    let code = `export const ServerErrorCodes = Object.keys(\n`;

    code += "AllServerErrorCodes";

    code += ") as ServerErrorCode[];";

    return code;
  }

  generateIndexCode(): GeneratedCode {
    return {
      code: `
        ${this.generateServerErrorCodeImports()}
        ${this.generateServerErrorCodeType()}
        ${this.generateAllServerErrorCodesString()}
        ${this.generateCummulatedServerErrorCodes()}
      `,
      endpoint: "index",
      language: this.language,
    };
  }
}
