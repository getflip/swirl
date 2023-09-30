const CreateUserGroupErrorCodes = {
  LANGUAGE_NOT_ENABLED: "LANGUAGE_NOT_ENABLED",
  DUPLICATE_ID: "DUPLICATE_ID",
  DUPLICATE_EXTERNAL_ID: "DUPLICATE_EXTERNAL_ID",
} as const;
const UpdateUserGroupErrorCodes = {
  LANGUAGE_NOT_ENABLED: "LANGUAGE_NOT_ENABLED",
  DUPLICATE_EXTERNAL_ID: "DUPLICATE_EXTERNAL_ID",
  USER_GROUP_ARCHIVED: "USER_GROUP_ARCHIVED",
} as const;
const ArchiveUserGroupErrorCodes = {
  USER_GROUP_IS_PREDEFINED: "USER_GROUP_IS_PREDEFINED",
} as const;
const RestoreUserGroupErrorCodes = {
  USER_GROUP_IS_PREDEFINED: "USER_GROUP_IS_PREDEFINED",
  USER_GROUP_NOT_ARCHIVED: "USER_GROUP_NOT_ARCHIVED",
} as const;
const AssignUserToUserGroupErrorCodes = {
  USER_GROUP_ROLE_DOES_NOT_EXIST: "USER_GROUP_ROLE_DOES_NOT_EXIST",
  USER_GROUP_ASSIGNMENT_ALREADY_EXISTS: "USER_GROUP_ASSIGNMENT_ALREADY_EXISTS",
} as const;
export const UserGroupsErrorCodes = {
  ...CreateUserGroupErrorCodes,
  ...UpdateUserGroupErrorCodes,
  ...ArchiveUserGroupErrorCodes,
  ...RestoreUserGroupErrorCodes,
  ...AssignUserToUserGroupErrorCodes,
} as const;
export type UserGroupsError = keyof typeof UserGroupsErrorCodes;
