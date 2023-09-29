import { CodeGenerator } from ".";
import { EndpointErrorCollection, GeneratedCode } from "../../types";

export class DartGenerator implements CodeGenerator {
  private refNames: Array<string> = [];
  private endpointErrorCollection: EndpointErrorCollection;

  constructor(errorCodes: EndpointErrorCollection) {
    this.endpointErrorCollection = errorCodes;
    this.endpointErrorCollection.errorCodes.forEach((errorCode) => {
      if (errorCode) {
        this.refNames.push(errorCode["x-readme-ref-name"]);
      }
    });
  }

  generateCode(): GeneratedCode {
    throw new Error("Method not implemented.");
  }
}
