export const CreateUserErrors = {
  USER_ID_ALREADY_EXISTS: "USER_ID_ALREADY_EXISTS",
  USERNAME_ALREADY_EXISTS: "USERNAME_ALREADY_EXISTS",
  EXTERNAL_ID_ALREADY_EXISTS: "EXTERNAL_ID_ALREADY_EXISTS",
} as const;

export const UpdateUserErrors = {
  USERNAME_ALREADY_EXISTS: "USERNAME_ALREADY_EXISTS",
  EXTERNAL_ID_ALREADY_EXISTS: "EXTERNAL_ID_ALREADY_EXISTS",
} as const;

export const CreateLinkedIdentityErrors = {
  INVALID_IDENTITY_PROVIDER: "INVALID_IDENTITY_PROVIDER",
} as const;

export const ChangePasswordForUserErrors = {
  PASSWORD_POLICY_NOT_RESPECTED: "PASSWORD_POLICY_NOT_RESPECTED",
  PASSWORD_HISTORY_POLICY_NOT_RESPECTED:
    "PASSWORD_HISTORY_POLICY_NOT_RESPECTED",
} as const;

export const SendAccountActionsEmailErrors = {
  USER_IS_LOCKED: "USER_IS_LOCKED",
  USER_HAS_NOT_EMAIL_ADDRESS: "USER_HAS_NOT_EMAIL_ADDRESS",
} as const;

export const ChangeMyPasswordErrors = {
  WRONG_PASSWORD: "WRONG_PASSWORD",
  PASSWORD_POLICY_NOT_RESPECTED: "PASSWORD_POLICY_NOT_RESPECTED",
  PASSWORD_HISTORY_POLICY_NOT_RESPECTED:
    "PASSWORD_HISTORY_POLICY_NOT_RESPECTED",
} as const;

export const UserErrors = {
  ...CreateUserErrors,
  ...CreateLinkedIdentityErrors,
  ...UpdateUserErrors,
  ...ChangePasswordForUserErrors,
  ...SendAccountActionsEmailErrors,
  ...ChangeMyPasswordErrors,
} as const;

export type UserError = keyof typeof UserErrors;
