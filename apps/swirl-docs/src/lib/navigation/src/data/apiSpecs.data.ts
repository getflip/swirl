import { NavItem } from "../navigation.model";

export const apiSpecsNavItems: NavItem[] = [
  {
    title: "Branding Admin",
    url: "/api-docs/branding-admin/theme",
    children: [
      {
        children: [
          {
            title: "List of themes",
            tag: "get",
            url: "/api-docs/branding-admin/theme#search-themes",
          },
          {
            title: "Get active theme for a user group",
            tag: "get",
            url: "/api-docs/branding-admin/theme#get-theme",
          },
          {
            title: "Updates the theme settings for a user group",
            tag: "patch",
            url: "/api-docs/branding-admin/theme#update-theme",
          },
          {
            title:
              "Reset a theme causing the user group to inherit a theme from above",
            tag: "post",
            url: "/api-docs/branding-admin/theme#reset-theme",
          },
        ],
        title: "Theme",
        url: "/api-docs/branding-admin/theme",
      },
      {
        children: [
          {
            title: "Get pwa theme for an unauthorized user.",
            tag: "get",
            url: "/api-docs/branding-admin/theme-pwa#get-bootstrap-theme-pwa",
          },
          {
            title: "Get pwa theme for the authenticated user.",
            tag: "get",
            url: "/api-docs/branding-admin/theme-pwa#get-theme-pwa",
          },
        ],
        title: "Theme Pwa",
        url: "/api-docs/branding-admin/theme-pwa",
      },
      {
        children: [
          {
            title: "Get mobile theme for an unauthorized user.",
            tag: "get",
            url: "/api-docs/branding-admin/theme-flip-mobile#get-bootstrap-theme-mobile",
          },
          {
            title: "Get mobile theme for the authenticated user.",
            tag: "get",
            url: "/api-docs/branding-admin/theme-flip-mobile#get-theme-mobile",
          },
        ],
        title: "Theme Flip Mobile",
        url: "/api-docs/branding-admin/theme-flip-mobile",
      },
      {
        children: [
          {
            title: "Get web theme for an unauthorized user.",
            tag: "get",
            url: "/api-docs/branding-admin/theme-flip-web#get-bootstrap-theme-web",
          },
          {
            title: "Get web theme for the authenticated user.",
            tag: "get",
            url: "/api-docs/branding-admin/theme-flip-web#get-theme-web",
          },
        ],
        title: "Theme Flip Web",
        url: "/api-docs/branding-admin/theme-flip-web",
      },
    ],
    specName: "branding-admin",
    description: "",
  },
  {
    title: "Channel Admin",
    url: "/api-docs/channel-admin/assignable-users",
    children: [
      {
        children: [
          {
            title: "Get Assignable Users",
            tag: "get",
            url: "/api-docs/channel-admin/assignable-users#get-channel-assignable-users",
          },
        ],
        title: "Assignable Users",
        url: "/api-docs/channel-admin/assignable-users",
      },
      {
        children: [
          {
            title: "Get Assignable User Groups",
            tag: "get",
            url: "/api-docs/channel-admin/assignable-user-groups#get-channel-assignable-user-groups",
          },
        ],
        title: "Assignable User Groups",
        url: "/api-docs/channel-admin/assignable-user-groups",
      },
      {
        children: [
          {
            title: "Get Channel User Assignments",
            tag: "get",
            url: "/api-docs/channel-admin/assigned-users#get-channel-user-assignments",
          },
          {
            title: "Create Multiple User Assignments",
            tag: "post",
            url: "/api-docs/channel-admin/assigned-users#create-channel-user-assignments-batch",
          },
          {
            title: "Create User Assignment",
            tag: "post",
            url: "/api-docs/channel-admin/assigned-users#create-channel-user-assignment",
          },
        ],
        title: "Assigned Users",
        url: "/api-docs/channel-admin/assigned-users",
      },
      {
        children: [
          {
            title: "Get Channel User Group Assignments",
            tag: "get",
            url: "/api-docs/channel-admin/assigned-user-groups#get-channel-user-group-assignments",
          },
          {
            title: "Create Multiple User Group Assignments",
            tag: "post",
            url: "/api-docs/channel-admin/assigned-user-groups#create-channel-user-group-assignments-batch",
          },
          {
            title: "Create User Group Assignment",
            tag: "post",
            url: "/api-docs/channel-admin/assigned-user-groups#create-channel-user-group-assignment",
          },
        ],
        title: "Assigned User Groups",
        url: "/api-docs/channel-admin/assigned-user-groups",
      },
      {
        children: [
          {
            title: "Get Channels",
            tag: "get",
            url: "/api-docs/channel-admin/channels#get-channels",
          },
        ],
        title: "Channels",
        url: "/api-docs/channel-admin/channels",
      },
    ],
    specName: "channel-admin",
    description: "",
  },
  {
    title: "Channels",
    url: "/api-docs/channels/post-comments",
    children: [
      {
        children: [
          {
            title: "Report a Comment.",
            tag: "post",
            url: "/api-docs/channels/post-comments#post-comment-report",
          },
        ],
        title: "Post Comments",
        url: "/api-docs/channels/post-comments",
      },
      {
        children: [
          {
            title:
              "Get aggregated Post Count (unread and scheduled) across all channels for the calling user.",
            tag: "get",
            url: "/api-docs/channels/posts#get-aggregated-post-count",
          },
        ],
        title: "Posts",
        url: "/api-docs/channels/posts",
      },
    ],
    specName: "channels",
    description: "",
  },
  {
    title: "Files",
    url: "/api-docs/files/files",
    children: [
      {
        children: [
          {
            title: "Create a new file",
            tag: "post",
            url: "/api-docs/files/files#create-file",
          },
          {
            title: "Get Metadata about an uploaded file.",
            tag: "get",
            url: "/api-docs/files/files#get-file",
          },
        ],
        title: "Files",
        url: "/api-docs/files/files",
      },
    ],
    specName: "files",
    description: "",
  },
  {
    title: "Navigation",
    url: "/api-docs/navigation/menu-items",
    children: [
      {
        children: [
          {
            title: "Get menu items",
            tag: "get",
            url: "/api-docs/navigation/menu-items#get-menu-items",
          },
          {
            title: "Create a new menu item",
            tag: "post",
            url: "/api-docs/navigation/menu-items#create-menu-item",
          },
          {
            title: "Get menu items for the selected user group",
            tag: "get",
            url: "/api-docs/navigation/menu-items#get-menu-items-for-user-group",
          },
          {
            title: "Update positions of menu items in context of a user group",
            tag: "post",
            url: "/api-docs/navigation/menu-items#update-positions-of-menu-items-within-user-group",
          },
        ],
        title: "Menu Items",
        url: "/api-docs/navigation/menu-items",
      },
    ],
    specName: "navigation",
    description: "",
  },
  {
    title: "Organisation",
    url: "/api-docs/organisation/bootstrap",
    children: [
      {
        children: [
          {
            title: "Get app compatibility",
            tag: "get",
            url: "/api-docs/organisation/bootstrap#get-app-compatibility",
          },
          {
            title: "Get organisation by keyword",
            tag: "get",
            url: "/api-docs/organisation/bootstrap#get-organisation-by-keyword",
          },
          {
            title: "Retrieve the password policy",
            tag: "get",
            url: "/api-docs/organisation/bootstrap#get-password-policy",
          },
        ],
        title: "Bootstrap",
        url: "/api-docs/organisation/bootstrap",
      },
    ],
    specName: "organisation",
    description: "",
  },
  {
    title: "Organisation Admin",
    url: "/api-docs/organisation-admin/language-settings",
    children: [
      {
        children: [
          {
            title: "Get language settings for organisation",
            tag: "get",
            url: "/api-docs/organisation-admin/language-settings#get-language-settings",
          },
          {
            title: "Update language settings for organisation",
            tag: "patch",
            url: "/api-docs/organisation-admin/language-settings#update-language-settings",
          },
        ],
        title: "Language Settings",
        url: "/api-docs/organisation-admin/language-settings",
      },
    ],
    specName: "organisation-admin",
    description: "",
  },
  {
    title: "Posts",
    url: "/api-docs/posts/posts",
    children: [
      {
        children: [
          {
            title: "Get Posts.",
            tag: "get",
            url: "/api-docs/posts/posts#get-posts",
          },
          {
            title: "Get a Post.",
            tag: "get",
            url: "/api-docs/posts/posts#get-post",
          },
          {
            title: "Update the Post Content.",
            tag: "patch",
            url: "/api-docs/posts/posts#update-post-content",
          },
        ],
        title: "Posts",
        url: "/api-docs/posts/posts",
      },
    ],
    specName: "posts",
    description: "",
  },
  {
    title: "Sharepoint Pages",
    url: "/api-docs/sharepoint-pages/sites",
    children: [
      {
        children: [
          {
            title:
              "Execute a full-text search in sharepoint pages.\nSearches over the title and the body of the pages.",
            tag: "get",
            url: "/api-docs/sharepoint-pages/sites#sharepoint-pages-search",
          },
          {
            title:
              "Execute a full-text search in a sharepoint site.\nSearches over the title and the body of the pages.",
            tag: "get",
            url: "/api-docs/sharepoint-pages/sites#sharepoint-pages-site-search",
          },
        ],
        title: "Sites",
        url: "/api-docs/sharepoint-pages/sites",
      },
    ],
    specName: "sharepoint-pages",
    description: "",
  },
  {
    title: "Tasks",
    url: "/api-docs/tasks/tasks",
    children: [
      {
        children: [
          {
            title: "Get all tasks",
            tag: "get",
            url: "/api-docs/tasks/tasks#get-tasks",
          },
          {
            title: "Create a new task",
            tag: "post",
            url: "/api-docs/tasks/tasks#create-task",
          },
          {
            title: "Modify/Update existing task",
            tag: "patch",
            url: "/api-docs/tasks/tasks#update-task",
          },
          {
            title: "Delete a task",
            tag: "delete",
            url: "/api-docs/tasks/tasks#delete-task",
          },
        ],
        title: "Tasks",
        url: "/api-docs/tasks/tasks",
      },
      {
        children: [
          {
            title: "Get task assignments",
            tag: "get",
            url: "/api-docs/tasks/task-assignments#get-task-assignments-by-actor",
          },
          {
            title: "Delete existing task assignment",
            tag: "delete",
            url: "/api-docs/tasks/task-assignments#delete-task-assignment",
          },
          {
            title: "Marking a task assignment as finished",
            tag: "post",
            url: "/api-docs/tasks/task-assignments#finish-task-assignment",
          },
          {
            title: "Marking a task assignment as open",
            tag: "post",
            url: "/api-docs/tasks/task-assignments#open-task-assignment",
          },
          {
            title: "Get task assignments",
            tag: "get",
            url: "/api-docs/tasks/task-assignments#get-task-assignments-by-task",
          },
          {
            title: "Create new task assignment",
            tag: "post",
            url: "/api-docs/tasks/task-assignments#create-task-assignment",
          },
          {
            title: "Create multiple task assignments",
            tag: "post",
            url: "/api-docs/tasks/task-assignments#batch-create-task-assignments",
          },
          {
            title: "Delete multiple task assignments",
            tag: "delete",
            url: "/api-docs/tasks/task-assignments#batch-delete-task-assignments",
          },
        ],
        title: "Task Assignments",
        url: "/api-docs/tasks/task-assignments",
      },
      {
        children: [
          {
            title: "Get number of tasks",
            tag: "get",
            url: "/api-docs/tasks/task-assignments-summary#get-tasks-assignments-summary",
          },
          {
            title: "Get a summary for the task assignments.",
            tag: "get",
            url: "/api-docs/tasks/task-assignments-summary#get-task-assignments-summary",
          },
        ],
        title: "Task Assignments Summary",
        url: "/api-docs/tasks/task-assignments-summary",
      },
      {
        children: [
          {
            title: "Search recipients for a task",
            tag: "get",
            url: "/api-docs/tasks/task-recipients#search-task-recipients",
          },
        ],
        title: "Task Recipients",
        url: "/api-docs/tasks/task-recipients",
      },
      {
        children: [
          {
            title: "Delete existing task comment",
            tag: "delete",
            url: "/api-docs/tasks/task-comments#delete-task-comment",
          },
          {
            title: "Get all task comments",
            tag: "get",
            url: "/api-docs/tasks/task-comments#get-tasks-comments",
          },
          {
            title: "Create a task comment",
            tag: "post",
            url: "/api-docs/tasks/task-comments#create-task-comment",
          },
        ],
        title: "Task Comments",
        url: "/api-docs/tasks/task-comments",
      },
      {
        children: [
          {
            title: "Update task comment reaction",
            tag: "patch",
            url: "/api-docs/tasks/task-comment-reactions#update-task-comment-reaction",
          },
          {
            title: "Delete task comment reaction",
            tag: "delete",
            url: "/api-docs/tasks/task-comment-reactions#delete-task-comment-reaction",
          },
          {
            title: "Get paginated reactions to a task comment",
            tag: "get",
            url: "/api-docs/tasks/task-comment-reactions#get-task-comment-reactions",
          },
          {
            title: "Create new task comment reaction",
            tag: "post",
            url: "/api-docs/tasks/task-comment-reactions#create-task-comment-reaction",
          },
        ],
        title: "Task Comment Reactions",
        url: "/api-docs/tasks/task-comment-reactions",
      },
    ],
    specName: "tasks",
    description: "",
  },
  {
    title: "User",
    url: "/api-docs/user/user",
    children: [
      {
        children: [
          {
            title: "Create user",
            tag: "post",
            url: "/api-docs/user/user#create-user",
          },
        ],
        title: "User",
        url: "/api-docs/user/user",
      },
      {
        children: [
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
        ],
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
            title: "List mentionable users",
            tag: "get",
            url: "/api-docs/user/on-leave#get-mentionable-users-for-on-leave",
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
        ],
        title: "On Leave",
        url: "/api-docs/user/on-leave",
      },
      {
        children: [
          {
            title: "Create action link",
            tag: "post",
            url: "/api-docs/user/action-link#create-action-link",
          },
        ],
        title: "Action Link",
        url: "/api-docs/user/action-link",
      },
    ],
    specName: "user",
    description: "",
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
        title: "Role",
        url: "/api-docs/user-admin/role",
      },
      {
        children: [
          {
            title: "List all users",
            tag: "get",
            url: "/api-docs/user-admin/user#search-users",
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
            title: "List assignable roles",
            tag: "get",
            url: "/api-docs/user-admin/user-role-assignment#get-assignable-organization-roles",
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
        title: "User Group Assignments",
        url: "/api-docs/user-admin/user-group-assignments",
      },
    ],
    specName: "user-admin",
    description: "",
  },
];
