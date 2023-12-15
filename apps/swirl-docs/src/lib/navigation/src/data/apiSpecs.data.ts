import { NavItem } from "../navigation.model";

export const apiSpecsNavItems: NavItem[] = [
  {
    title: "Branding",
    url: "/api-docs/branding/theme",
    children: [
      {
        children: [
          {
            title: "List of themes",
            tag: "get",
            url: "/api-docs/branding/theme#search-themes",
          },
          {
            title: "Get active theme for a user group",
            tag: "get",
            url: "/api-docs/branding/theme#get-theme",
          },
          {
            title: "Updates the theme settings for a user group",
            tag: "patch",
            url: "/api-docs/branding/theme#update-theme",
          },
          {
            title:
              "Reset a theme causing the user group to inherit a theme from above",
            tag: "post",
            url: "/api-docs/branding/theme#reset-theme",
          },
          {
            title: "Get mobile theme for an unauthorized user.",
            tag: "get",
            url: "/api-docs/branding/theme#get-bootstrap-theme-mobile",
          },
          {
            title: "Get pwa theme for an unauthorized user.",
            tag: "get",
            url: "/api-docs/branding/theme#get-bootstrap-theme-pwa",
          },
          {
            title: "Get web theme for an unauthorized user.",
            tag: "get",
            url: "/api-docs/branding/theme#get-bootstrap-theme-web",
          },
          {
            title: "Get mobile theme for the authenticated user.",
            tag: "get",
            url: "/api-docs/branding/theme#get-theme-mobile",
          },
          {
            title: "Get pwa theme for the authenticated user.",
            tag: "get",
            url: "/api-docs/branding/theme#get-theme-pwa",
          },
          {
            title: "Get web theme for the authenticated user.",
            tag: "get",
            url: "/api-docs/branding/theme#get-theme-web",
          },
        ],
        isRoot: true,
        title: "Theme",
        url: "/api-docs/branding/theme",
      },
    ],
    description: "",
    isRoot: true,
  },
  {
    title: "Organisation",
    url: "/api-docs/organisation/language-settings",
    children: [
      {
        children: [
          {
            title: "Get language settings for organisation",
            tag: "get",
            url: "/api-docs/organisation/language-settings#get-language-settings",
          },
          {
            title: "Update language settings for organisation",
            tag: "patch",
            url: "/api-docs/organisation/language-settings#update-language-settings",
          },
        ],
        isRoot: true,
        title: "Language Settings",
        url: "/api-docs/organisation/language-settings",
      },
      {
        children: [
          {
            title: "Retrieve the password policy",
            tag: "get",
            url: "/api-docs/organisation/password-policy#get-password-policy",
          },
        ],
        isRoot: true,
        title: "Password Policy",
        url: "/api-docs/organisation/password-policy",
      },
      {
        children: [
          {
            title: "Get app compatibility",
            tag: "get",
            url: "/api-docs/organisation/app-bootstrap#get-app-compatibility",
          },
          {
            title: "Get organisation by keyword",
            tag: "get",
            url: "/api-docs/organisation/app-bootstrap#get-organisation-by-keyword",
          },
        ],
        isRoot: true,
        title: "App Bootstrap",
        url: "/api-docs/organisation/app-bootstrap",
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
            title: "Create user",
            tag: "post",
            url: "/api-docs/user-admin/user#create-user",
          },
          {
            title: "Get user",
            tag: "get",
            url: "/api-docs/user-admin/user#get-user",
          },
          {
            title: "Update user",
            tag: "patch",
            url: "/api-docs/user-admin/user#update-user",
          },
          {
            title: "Delete user",
            tag: "delete",
            url: "/api-docs/user-admin/user#delete-user",
          },
          {
            title: "Lock user",
            tag: "post",
            url: "/api-docs/user-admin/user#lock-user",
          },
          {
            title: "Unlock User",
            tag: "post",
            url: "/api-docs/user-admin/user#unlock-user",
          },
        ],
        isRoot: true,
        title: "User",
        url: "/api-docs/user-admin/user",
      },
      {
        children: [
          {
            title: "Assign organisation roles to users",
            tag: "post",
            url: "/api-docs/user-admin/user-role-assignment#assign-role-to-user-batch",
          },
          {
            title: "Remove multiple role assignments from users",
            tag: "delete",
            url: "/api-docs/user-admin/user-role-assignment#remove-role-from-user-batch",
          },
          {
            title: "List assigned organisation roles for user",
            tag: "get",
            url: "/api-docs/user-admin/user-role-assignment#get-user-roles",
          },
          {
            title: "Assign organisation role to user",
            tag: "post",
            url: "/api-docs/user-admin/user-role-assignment#assign-role-to-user",
          },
          {
            title: "Remove organisation role assignment from user",
            tag: "delete",
            url: "/api-docs/user-admin/user-role-assignment#remove-role-from-user",
          },
        ],
        isRoot: true,
        title: "User Role Assignment",
        url: "/api-docs/user-admin/user-role-assignment",
      },
      {
        children: [
          {
            title: "List linkable identity providers",
            tag: "get",
            url: "/api-docs/user-admin/linked-identity#get-linkable-identity-providers",
          },
          {
            title: "List linked identities for user",
            tag: "get",
            url: "/api-docs/user-admin/linked-identity#get-linked-identities",
          },
          {
            title: "Link identity to user",
            tag: "post",
            url: "/api-docs/user-admin/linked-identity#create-linked-identity",
          },
          {
            title: "Delete linked identity",
            tag: "delete",
            url: "/api-docs/user-admin/linked-identity#delete-linked-identity",
          },
        ],
        isRoot: true,
        title: "Linked Identity",
        url: "/api-docs/user-admin/linked-identity",
      },
      {
        children: [
          {
            title: "Check OTP configuration",
            tag: "get",
            url: "/api-docs/user-admin/one-time-password#has-otp",
          },
          {
            title: "Delete OTP",
            tag: "delete",
            url: "/api-docs/user-admin/one-time-password#delete-otp",
          },
        ],
        isRoot: true,
        title: "One Time Password",
        url: "/api-docs/user-admin/one-time-password",
      },
      {
        children: [
          {
            title: "Check password configuration",
            tag: "get",
            url: "/api-docs/user-admin/password#has-password",
          },
          {
            title: "Reset password",
            tag: "post",
            url: "/api-docs/user-admin/password#change-password",
          },
          {
            title: "Delete password",
            tag: "delete",
            url: "/api-docs/user-admin/password#delete-password",
          },
        ],
        isRoot: true,
        title: "Password",
        url: "/api-docs/user-admin/password",
      },
      {
        children: [
          {
            title: "Send multiple account actions emails",
            tag: "post",
            url: "/api-docs/user-admin/account-actions-email#send-account-actions-emails-batch",
          },
          {
            title: "Send account actions email",
            tag: "post",
            url: "/api-docs/user-admin/account-actions-email#send-account-actions-email",
          },
        ],
        isRoot: true,
        title: "Account Actions Email",
        url: "/api-docs/user-admin/account-actions-email",
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
            title: "List assignable parent user groups",
            tag: "get",
            url: "/api-docs/user-admin/user-groups#search-assignable-parent-user-groups",
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
        ],
        isRoot: true,
        title: "User Groups",
        url: "/api-docs/user-admin/user-groups",
      },
      {
        children: [
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
            title: "List assignable users",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#get-assignable-users-for-user-group",
          },
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
            title: "Get user group assignment",
            tag: "get",
            url: "/api-docs/user-admin/user-group-assignments#get-user-group-assignment",
          },
          {
            title: "Delete user group assignment",
            tag: "delete",
            url: "/api-docs/user-admin/user-group-assignments#delete-user-group-assignment",
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
  {
    title: "User Adminf api",
    url: "/api-docs/user-adminf api/user",
    children: [
      {
        children: [
          {
            title: "List all users",
            tag: "get",
            url: "/api-docs/user-adminf api/user#search-users",
          },
        ],
        isRoot: true,
        title: "User",
        url: "/api-docs/user-adminf api/user",
      },
    ],
    description: "",
    isRoot: true,
  },
  {
    title: "User Me",
    url: "/api-docs/user-me/my-password",
    children: [
      {
        children: [
          {
            title: "Check my password configuration",
            tag: "get",
            url: "/api-docs/user-me/my-password#do-I-have-a-password",
          },
          {
            title: "Change my password",
            tag: "post",
            url: "/api-docs/user-me/my-password#change-my-password",
          },
        ],
        isRoot: true,
        title: "My Password",
        url: "/api-docs/user-me/my-password",
      },
      {
        children: [
          {
            title: "Get my email address",
            tag: "get",
            url: "/api-docs/user-me/my-email#get-my-email-address",
          },
          {
            title: "Change my email address",
            tag: "post",
            url: "/api-docs/user-me/my-email#change-my-account-email",
          },
        ],
        isRoot: true,
        title: "My Email",
        url: "/api-docs/user-me/my-email",
      },
      {
        children: [
          {
            title: "Notify logged in",
            tag: "post",
            url: "/api-docs/user-me/user-me#logged-in",
          },
        ],
        isRoot: true,
        title: "User Me",
        url: "/api-docs/user-me/user-me",
      },
      {
        children: [
          {
            title: "List my on-leave notes",
            tag: "get",
            url: "/api-docs/user-me/on-leave#get-on-leave-notes",
          },
          {
            title: "Create on-leave note",
            tag: "post",
            url: "/api-docs/user-me/on-leave#create-on-leave-note",
          },
          {
            title: "List mentionable users",
            tag: "get",
            url: "/api-docs/user-me/on-leave#get-mentionable-users-for-on-leave",
          },
          {
            title: "Get my on-leave note",
            tag: "get",
            url: "/api-docs/user-me/on-leave#get-on-leave-note",
          },
          {
            title: "Update on-leave note",
            tag: "patch",
            url: "/api-docs/user-me/on-leave#update-on-leave-note",
          },
          {
            title: "Delete on-leave note",
            tag: "delete",
            url: "/api-docs/user-me/on-leave#delete-on-leave-note",
          },
        ],
        isRoot: true,
        title: "On Leave",
        url: "/api-docs/user-me/on-leave",
      },
    ],
    description: "",
    isRoot: true,
  },
];
