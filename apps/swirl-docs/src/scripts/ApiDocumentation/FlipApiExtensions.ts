import { Operation } from "oas";
import { SchemaObject } from "oas/dist/rmoas.types";

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

  static getIgnoreRule(operation: Operation, rule: string): boolean {
    return (
      operation.getExtension("x-flip-ignore-rules") === rule ||
      operation.getExtension("x-flip-ignore-rules-critical") === rule
    );
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

  static getHiddenParams(schemaObject: SchemaObject): string[] | undefined {
    if (!schemaObject) {
      return;
    }

    if (!("x-flip-hidden" in schemaObject)) {
      return;
    }

    const hiddenFields = schemaObject["x-flip-hidden"];
    if (!Array.isArray(hiddenFields)) {
      return;
    }

    return hiddenFields;
  }
}
