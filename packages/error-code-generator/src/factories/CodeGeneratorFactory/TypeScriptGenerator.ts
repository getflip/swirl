import { CodeGeneratorWithIndex } from ".";
import { EndpointErrorCollection, GeneratedCode } from "../../types";

export class TypeScriptGenerator implements CodeGeneratorWithIndex {
  readonly language = "TypeScript";
  readonly fileExtension: string = "ts";
  hasIndexFileRendering: true = true;

  indexFileConfig: GeneratedCode = {
    endpoint: "index",
    language: this.language,
    code: "",
    fileExtension: "ts",
  };

  private refNames: Array<string> = [];
  private endpointErrorCollection?: EndpointErrorCollection;
  private endpointErrorTypeString?: string;
  private endpointErrorCodesTypeString?: string;

  private endpointErrorTypeStringCache: Array<string> = [];
  private endpointErrorCodesTypeStringCache: Array<string> = [];

  private endpointErrorStringsCache: Map<string, Array<string>> = new Map();

  setEndpointErrorCollection(errorCollection: EndpointErrorCollection): this {
    this.endpointErrorCollection = errorCollection;
    this.refNames = [
      ...new Set(
        errorCollection.errorCodes?.map((errorCode) => {
          const refName = errorCode?.["x-readme-ref-name"];
          if (Array.isArray(errorCode)) {
            throw new Error("Error code definition must an object");
          }
          if (!Array.isArray(errorCode?.enum)) {
            throw new Error("Error code definition must have an enum array");
          }
          if (errorCode?.type !== "string") {
            throw new Error("Error code definition must be of type string!");
          }
          if (!refName) {
            throw new Error(
              "Error code definition must be a single reference to an error code reference object",
            );
          }
          return refName;
        }) ?? [],
      ),
    ];

    this.endpointErrorCodesTypeString = `${errorCollection.endpoint}ErrorCodes`;
    this.endpointErrorTypeString = `${errorCollection.endpoint}Error`;
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
      fileExtension: "ts",
    };

    this.resetGeneratorState();
    return generatedCode;
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
      fileExtension: "ts",
    };
  }

  private generate(): string {
    const summaryErrorObject = this.generateSummaryErrorCodeObject();
    const endpointErrorType = this.generateEndpointErrorType();

    const errorObjects = this.generateErrorObjects();

    return `
      ${errorObjects}
      ${summaryErrorObject}
      ${endpointErrorType}
    `;
  }

  private generateErrorObjects(): string {
    return this.refNames
      .map((refName) => this.createErrorObjectForRefName(refName))
      .join("\n");
  }

  private createErrorObjectForRefName(refName: string) {
    const errorCodeForRefName = this.findErrorCodeForRefName(refName);
    const errorEnums = errorCodeForRefName?.enum ?? [];
    return this.createErrorAsConstObject(refName, errorEnums);
  }

  private findErrorCodeForRefName(refName: string) {
    return this.endpointErrorCollection?.errorCodes?.find(
      (errorCode) => errorCode?.["x-readme-ref-name"] === refName,
    );
  }

  private createErrorAsConstObject(
    variableName: string,
    errorCodes: string[],
  ): string {
    const mapObject = Object.fromEntries(
      errorCodes.map((error) => [error, error]),
    );
    const jsonString = JSON.stringify(mapObject, null, 2);

    return `const ${variableName} = ${jsonString} as const;`;
  }

  private generateSummaryErrorCodeObject(): string {
    const codeEntries = this.refNames
      .map((category) => `  ...${category},`)
      .join("\n");

    return `export const ${this.endpointErrorCodesTypeString} = {\n${codeEntries}\n} as const;`;
  }

  private generateEndpointErrorType() {
    return `export type ${this.endpointErrorTypeString} = keyof typeof ${this.endpointErrorCodesTypeString};`;
  }

  private generateServerErrorCodeType(): string {
    return `export type ServerErrorCode = ${this.endpointErrorTypeStringCache.join(
      " | ",
    )};`;
  }

  private generateAllServerErrorCodesString(): string {
    const codeEntries = this.endpointErrorCodesTypeStringCache
      .map((type) => `  ...${type},`)
      .join("\n");

    return `export const AllServerErrorCodes = {\n${codeEntries}\n} as const;`;
  }

  private generateServerErrorCodeImports(): string {
    const imports: string[] = [];

    for (const [key, [type, codesType]] of this.endpointErrorStringsCache) {
      imports.push(`import { ${type}, ${codesType} } from "./${key}";`);
    }

    return imports.join("\n");
  }

  generateCummulatedServerErrorCodes(): string {
    return `export const ServerErrorCodes = Object.keys(
    AllServerErrorCodes
  ) as ServerErrorCode[];`;
  }

  private resetGeneratorState(): void {
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
}
