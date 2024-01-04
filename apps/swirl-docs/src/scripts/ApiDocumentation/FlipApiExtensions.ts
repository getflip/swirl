import { Operation } from "oas";

export class FlipApiExtensions {
  static getErrorCodes(operation: Operation): string[] | undefined {
    const errorCodes = operation.getExtension("x-flip-error-codes") as
      | { type: "string"; enum: string[] }
      | undefined;

    if (errorCodes?.type === "string" && Array.isArray(errorCodes.enum)) {
      return errorCodes.enum;
    }
  }

  static getInternal(operation: Operation): boolean {
    return !!operation.getExtension("x-flip-internal");
  }

  static getExperimental(operation: Operation): boolean {
    return !!operation.getExtension("x-flip-experimental");
  }

  static getApiName(operation: Operation): string | undefined {
    const apiName = operation.getExtension("x-flip-api-name");
    if (typeof apiName === "string") {
      return apiName;
    }
  }

  static getResourceName(operation: Operation): string | undefined {
    const resourceName = operation.getExtension("x-flip-resource-name");
    if (typeof resourceName === "string") {
      return resourceName;
    }
  }
}
