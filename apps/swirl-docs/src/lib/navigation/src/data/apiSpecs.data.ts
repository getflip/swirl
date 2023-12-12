import { NavItem } from "../navigation.model";

export const apiSpecsNavItems: NavItem[] = [
  {
    title: "User",
    url: "/api-docs/user/user",
    children: [
      {
        children: [
          {
            title: "List all users",
            tag: "get",
            url: "/api-docs/user/user#search-users",
          },
          {
            title: "Create user",
            tag: "post",
            url: "/api-docs/user/user#create-user",
          },
          {
            title: "Get user",
            tag: "get",
            url: "/api-docs/user/user#get-user",
          },
          {
            title: "Update user",
            tag: "patch",
            url: "/api-docs/user/user#update-user",
          },
          {
            title: "Delete user",
            tag: "delete",
            url: "/api-docs/user/user#delete-user",
          },
          {
            title: "Lock user",
            tag: "post",
            url: "/api-docs/user/user#lock-user",
          },
          {
            title: "Unlock User",
            tag: "post",
            url: "/api-docs/user/user#unlock-user",
          },
        ],
        isRoot: true,
        title: "User",
        url: "/api-docs/user/user",
      },
      {
        children: [
          {
            title: "List assigned organisation roles for user",
            tag: "get",
            url: "/api-docs/user/user-role-assignment#get-user-roles",
          },
          {
            title: "Assign organisation role to user",
            tag: "post",
            url: "/api-docs/user/user-role-assignment#assign-role-to-user",
          },
          {
            title: "Remove organisation role assignment from user",
            tag: "delete",
            url: "/api-docs/user/user-role-assignment#remove-role-from-user",
          },
          {
            title: "Assign organisation roles to users",
            tag: "post",
            url: "/api-docs/user/user-role-assignment#assign-role-to-user-batch",
          },
          {
            title: "Remove multiple role assignments from users",
            tag: "delete",
            url: "/api-docs/user/user-role-assignment#remove-role-from-user-batch",
          },
        ],
        isRoot: true,
        title: "User Role Assignment",
        url: "/api-docs/user/user-role-assignment",
      },
      {
        children: [
          {
            title: "List linkable identity providers",
            tag: "get",
            url: "/api-docs/user/linked-identity#get-linkable-identity-providers",
          },
          {
            title: "List linked identities for user",
            tag: "get",
            url: "/api-docs/user/linked-identity#get-linked-identities",
          },
          {
            title: "Link identity to user",
            tag: "post",
            url: "/api-docs/user/linked-identity#create-linked-identity",
          },
          {
            title: "Delete linked identity",
            tag: "delete",
            url: "/api-docs/user/linked-identity#delete-linked-identity",
          },
        ],
        isRoot: true,
        title: "Linked Identity",
        url: "/api-docs/user/linked-identity",
      },
      {
        children: [
          {
            title: "Check OTP configuration",
            tag: "get",
            url: "/api-docs/user/one-time-password#has-otp",
          },
          {
            title: "Delete OTP",
            tag: "delete",
            url: "/api-docs/user/one-time-password#delete-otp",
          },
        ],
        isRoot: true,
        title: "One Time Password",
        url: "/api-docs/user/one-time-password",
      },
      {
        children: [
          {
            title: "Check password configuration",
            tag: "get",
            url: "/api-docs/user/password#has-password",
          },
          {
            title: "Reset password",
            tag: "post",
            url: "/api-docs/user/password#change-password",
          },
          {
            title: "Delete password",
            tag: "delete",
            url: "/api-docs/user/password#delete-password",
          },
        ],
        isRoot: true,
        title: "Password",
        url: "/api-docs/user/password",
      },
      {
        children: [
          {
            title: "Send account actions email",
            tag: "post",
            url: "/api-docs/user/account-actions-email#send-account-actions-email",
          },
          {
            title: "Send multiple account actions emails",
            tag: "post",
            url: "/api-docs/user/account-actions-email#send-account-actions-emails-batch",
          },
        ],
        isRoot: true,
        title: "Account Actions Email",
        url: "/api-docs/user/account-actions-email",
      },
      {
        children: [
          {
            title: "Check my password configuration",
            tag: "get",
            url: "/api-docs/user/user-me#do-I-have-a-password",
          },
          {
            title: "Change my password",
            tag: "post",
            url: "/api-docs/user/user-me#change-my-password",
          },
          {
            title: "Get my email address",
            tag: "get",
            url: "/api-docs/user/user-me#get-my-email-address",
          },
          {
            title: "Change my email address",
            tag: "post",
            url: "/api-docs/user/user-me#change-my-account-email",
          },
          {
            title: "Notify logged in",
            tag: "post",
            url: "/api-docs/user/user-me#logged-in",
          },
        ],
        isRoot: true,
        title: "User Me",
        url: "/api-docs/user/user-me",
      },
      {
        children: [
          {
            title: "List my on-leave notes",
            tag: "get",
            url: "/api-docs/user/on-leave#get-on-leave-notes",
          },
          {
            title: "Create on-leave note",
            tag: "post",
            url: "/api-docs/user/on-leave#create-on-leave-note",
          },
          {
            title: "Get my on-leave note",
            tag: "get",
            url: "/api-docs/user/on-leave#get-on-leave-note",
          },
          {
            title: "Update on-leave note",
            tag: "patch",
            url: "/api-docs/user/on-leave#update-on-leave-note",
          },
          {
            title: "Delete on-leave note",
            tag: "delete",
            url: "/api-docs/user/on-leave#delete-on-leave-note",
          },
          {
            title: "List mentionable users",
            tag: "get",
            url: "/api-docs/user/on-leave#get-mentionable-users-for-on-leave",
          },
        ],
        isRoot: true,
        title: "On Leave",
        url: "/api-docs/user/on-leave",
      },
    ],
    description: "",
    isRoot: true,
  },
  {
    title: "User Admin",
    url: "/api-docs/user-admin/role",
    children: [
      {
        children: [
          {
            title: "List roles",
            tag: "get",
            url: "/api-docs/user-admin/role#get-all-roles",
          },
          {
            title: "Get role",
            tag: "get",
            url: "/api-docs/user-admin/role#get-role",
          },
        ],
        isRoot: true,
        title: "Role",
        url: "/api-docs/user-admin/role",
      },
      {
        children: [
          {
            title: "List user groups",
            tag: "get",
            url: "/api-docs/user-admin/user-groups#search-user-groups",
          },
          {
            title: "Create user group",
            tag: "post",
            url: "/api-docs/user-admin/user-groups#create-user-group",
          },
          {
            title: "Get user group",
            tag: "get",
            url: "/api-docs/user-admin/user-groups#get-user-group",
          },
          {
            title: "Update user group",
            tag: "patch",
            url: "/api-docs/user-admin/user-groups#update-user-group",
          },
          {
            title: "Delete user group",
            tag: "delete",
            url: "/api-docs/user-admin/user-groups#delete-user-group",
          },
          {
            title: "Archive user group",
            tag: "post",
            url: "/api-docs/user-admin/user-groups#archive-user-group",
          },
          {
            title: "Restore user group",
            tag: "post",
            url: "/api-docs/user-admin/user-groups#restore-user-group",
          },
          {
            title: "List assignable parent user groups",
            tag: "get",
            url: "/api-docs/user-admin/user-groups#search-assignable-parent-user-groups",
          },
        ],
        isRoot: true,
        title: "User Groups",
        url: "/api-docs/user-admin/user-groups",
      },
      {
        children: [
          {
            title: "List user group assignments",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#search-user-group-assignments",
          },
          {
            title: "Create user group assignment",
            tag: "post",
            url: "/api-docs/user-admin/user-group-assignments#assign-user-to-user-group",
          },
          {
            title: "Get user group assignment",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#get-user-group-assignment",
          },
          {
            title: "Delete user group assignment",
            tag: "delete",
            url: "/api-docs/user-admin/user-group-assignments#delete-user-group-assignment",
          },
          {
            title: "List user group assignments grouped by user",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#search-user-group-assignments-aggregated-by-user",
          },
          {
            title: "List user group assignments",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#get-user-group-assignments-aggregated-by-user",
          },
          {
            title: "List assignable users",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#get-assignable-users-for-user-group",
          },
          {
            title: "List configured user group roles",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#get-all-user-group-roles",
          },
          {
            title: "List user group assignments",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#search-user-group-assignments-for-single-user",
          },
          {
            title: "Assign multiple users to user groups",
            tag: "post",
            url: "/api-docs/user-admin/user-group-assignments#assign-users-to-user-group-batch",
          },
          {
            title: "Delete multiple user group assignments",
            tag: "delete",
            url: "/api-docs/user-admin/user-group-assignments#delete-user-group-assignments-batch",
          },
        ],
        isRoot: true,
        title: "User Group Assignments",
        url: "/api-docs/user-admin/user-group-assignments",
      },
    ],
    description: "",
    isRoot: true,
  },
];
