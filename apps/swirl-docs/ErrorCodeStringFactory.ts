import { EndpointErrorCodes } from "ErrorCodeBuilder";

interface ErrorCodeStringFactory {
  generate(): {
    endpoint: string;
    errorObjects: string[];
    errorTypes: string[];
  };
}

export class ErrorCodeStringFactoryImpl implements ErrorCodeStringFactory {
  private refNames: Array<string> = [];
  private errorCodes: EndpointErrorCodes["errorCodes"];
  private endpoint: string;

  constructor(errorCodes: EndpointErrorCodes) {
    this.endpoint = errorCodes.endpoint;
    this.errorCodes = errorCodes.errorCodes;
    this.errorCodes.forEach((errorCode) => {
      if (errorCode) {
        this.refNames.push(errorCode["x-readme-ref-name"]);
      }
    });
  }

  generate() {
    const errorObjects: string[] = this.errorCodes.map((errorCode) => {
      if (errorCode) {
        return this.createErrorAsConstObject(
          errorCode["x-readme-ref-name"],
          errorCode.enum
        );
      }
      return "";
    });

    const errorTypes: string = this.generateUserErrorsCode(
      this.endpoint,
      this.refNames
    );

    return {
      endpoint: this.endpoint,
      errorObjects: errorObjects,
      errorTypes: [errorTypes],
    };
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

  private generateUserErrorsCode(
    endpoint: string,
    categories: string[]
  ): string {
    let code = `export const ${endpoint} = {\n`;

    categories.forEach((category) => {
      code += `  ...${category},\n`;
    });

    code += "} as const;";

    return code;
  }
}
