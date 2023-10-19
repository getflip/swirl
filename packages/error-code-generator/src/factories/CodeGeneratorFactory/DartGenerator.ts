import { BaseCodeGenerator } from ".";
import { EndpointErrorCollection, GeneratedCode } from "../../types";

export class DartGenerator implements BaseCodeGenerator {
  language = "Dart";
  fileExtension: string = "dart";
  private endpointErrorCollection?: EndpointErrorCollection;

  setEndpointErrorCollection(errorCollection: EndpointErrorCollection): this {
    this.endpointErrorCollection = errorCollection;
    return this;
  }

  generateCode(): GeneratedCode {
    if (!this.endpointErrorCollection) {
      throw new Error("No endpoint error collection provided");
    }

    return {
      endpoint: this.endpointErrorCollection.endpoint,
      language: this.language,
      code: this.generateFlipErrorCodesArray(),
      fileExtension: this.fileExtension,
    };
  }

  private generateFlipErrorCodesArray(): string {
    const errorCodes = this.generateErrorCodeArray();
    const errorCodesString = errorCodes.map((code) => `'${code}'`).join(", ");
    return `const flipErrorCodes = [${errorCodesString}];\n\n`;
  }

  private generateErrorCodeArray(): string[] {
    const errorCodes =
      this.endpointErrorCollection?.errorCodes?.flatMap(
        (errorCode) => errorCode?.enum ?? []
      ) ?? [];

    return [...new Set(errorCodes)];
  }
}
