import { CodeGenerator } from ".";
import { EndpointErrorCollection, GeneratedCode } from "../../types";

export class DartGenerator implements CodeGenerator {
  language = "Dart";
  fileExtension: string = "dart";
  private refNames: Array<string> = [];
  private endpointErrorCollection?: EndpointErrorCollection;

  setEndpointErrorCollection(errorCollection: EndpointErrorCollection) {
    this.endpointErrorCollection = errorCollection;
    this.endpointErrorCollection.errorCodes?.forEach((errorCode) => {
      if (errorCode) {
        this.refNames.push(errorCode["x-readme-ref-name"]);
      }
    });

    return this;
  }

  generateCode(): GeneratedCode {
    if (!this.endpointErrorCollection) {
      throw new Error("No endpoint error collection provided");
    }

    return {
      endpoint: this.endpointErrorCollection.endpoint,
      language: "Dart",
      code: "NO CODE NO CODE",
    };
  }
}
