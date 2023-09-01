import { UserError, UserErrors } from './users';

export * from './users';

export type ServerErrorCode = UserError;

export const AllServerErrorsCodes = {
  ...UserErrors,
} as const;

export const ServerErrorCodes = Object.keys(
  AllServerErrorsCodes
) as ServerErrorCode[];
