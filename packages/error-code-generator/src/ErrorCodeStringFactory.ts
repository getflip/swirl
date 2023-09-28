import { EndpointErrorCodes } from "./handler/ErrorCodeExtractorHandler";

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

    const summaryErrorObject: string = this.generateSummaryErrorCodeObject();
    const endpointErrorType: string = this.generateEndpointErrorType();

    return {
      endpoint: this.endpoint,
      errorObjects: [...errorObjects, summaryErrorObject],
      errorTypes: [endpointErrorType],
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

  private generateSummaryErrorCodeObject(): string {
    let code = `export const ${this.endpoint}ErrorCodes = {\n`;

    this.refNames.forEach((category) => {
      code += `  ...${category},\n`;
    });

    code += "} as const;";

    return code;
  }

  private generateEndpointErrorType() {
    return `export type ${this.endpoint}Error = keyof typeof ${this.endpoint}ErrorCodes;`;
  }
}

/**
 * EXAMPLE STRINGS
 * export const CreateUserGroupErrorCodes = {
  LANGUAGE_NOT_ENABLED: 'LANGUAGE_NOT_ENABLED',
  DUPLICATE_ID: 'DUPLICATE_ID',
  DUPLICATE_EXTERNAL_ID: 'DUPLICATE_EXTERNAL_ID',
} as const;

export const UpdateUserGroupErrorCodes = {
  LANGUAGE_NOT_ENABLED: 'LANGUAGE_NOT_ENABLED',
  DUPLICATE_EXTERNAL_ID: 'DUPLICATE_EXTERNAL_ID',
  USER_GROUP_ARCHIVED: 'USER_GROUP_ARCHIVED',
} as const;

export const ArchiveUserGroupErrorCodes = {
  USER_GROUP_IS_PREDEFINED: 'USER_GROUP_IS_PREDEFINED',
} as const;

export const RestoreUserGroupErrorCodes = {
  USER_GROUP_IS_PREDEFINED: 'USER_GROUP_IS_PREDEFINED',
  USER_GROUP_NOT_ARCHIVED: 'USER_GROUP_NOT_ARCHIVED',
} as const;

export const AssignUserToUserGroupErrorCodes = {
  USER_GROUP_ROLE_DOES_NOT_EXIST: 'USER_GROUP_ROLE_DOES_NOT_EXIST',
  USER_GROUP_ASSIGNMENT_ALREADY_EXISTS: 'USER_GROUP_ASSIGNMENT_ALREADY_EXISTS',
} as const;

export const UserGroupErrorCodes = {
  ...CreateUserGroupErrorCodes,
  ...UpdateUserGroupErrorCodes,
  ...ArchiveUserGroupErrorCodes,
  ...RestoreUserGroupErrorCodes,
  ...AssignUserToUserGroupErrorCodes,
} as const;

export type UserGroupError = keyof typeof UserGroupErrorCodes;

 *
 */
