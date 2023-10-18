import { NavItem } from "../navigation.model";

export const apiSpecsNavItems: NavItem[] = [
  {
    title: "Branding API",
    url: "/api-docs/branding-api",
    isRoot: true,
    children: [
      {
        title: "List of themes",
        url: "/api-docs/branding-api#list-of-themes",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get active theme for a user group",
        url: "/api-docs/branding-api#get-active-theme-for-a-user-group",
        description: "get",
        isRoot: false,
      },
      {
        title: "Updates the theme settings for a user group",
        url: "/api-docs/branding-api#updates-the-theme-settings-for-a-user-group",
        description: "patch",
        isRoot: false,
      },
      {
        title:
          "Reset a theme causing the user group to inherit a theme from above",
        url: "/api-docs/branding-api#reset-a-theme-causing-the-user-group-to-inherit-a-theme-from-above",
        description: "post",
        isRoot: false,
      },
    ],
    specName: "branding.yml",
  },
  {
    title: "Files",
    url: "/api-docs/files",
    isRoot: true,
    children: [
      {
        title: "Create a new file",
        url: "/api-docs/files#create-a-new-file",
        description: "post",
        isRoot: false,
      },
      {
        title: "Get Metadata about an uploaded file.",
        url: "/api-docs/files#get-metadata-about-an-uploaded-file",
        description: "get",
        isRoot: false,
      },
    ],
    specName: "files.yml",
  },
  {
    title: "Flip API V4",
    url: "/api-docs/flip-api-v4",
    isRoot: true,
    children: [
      {
        title: "Get language settings for organisation",
        url: "/api-docs/flip-api-v4#get-language-settings-for-organisation",
        description: "get",
        isRoot: false,
      },
      {
        title: "Update language settings for organisation",
        url: "/api-docs/flip-api-v4#update-language-settings-for-organisation",
        description: "patch",
        isRoot: false,
      },
    ],
    specName: "organisations.yml",
  },
  {
    title: "Posts",
    url: "/api-docs/posts",
    isRoot: true,
    children: [
      {
        title: "Report a comment.",
        url: "/api-docs/posts#report-a-comment",
        description: "post",
        isRoot: false,
      },
      {
        title:
          "Get aggregated post count (unread and scheduled) across all channels for the calling user",
        url: "/api-docs/posts#get-aggregated-post-count-(unread-and-scheduled)-across-all-channels-for-the-calling-user",
        description: "get",
        isRoot: false,
      },
    ],
    specName: "posts.yml",
  },
  {
    title: "Sharepoint Pages",
    url: "/api-docs/sharepoint-pages",
    isRoot: true,
    children: [
      {
        title:
          "Execute a full-text search in a sharepoint site.\nSearches over the title and the body of the pages.",
        url: "/api-docs/sharepoint-pages#execute-a-full-text-search-in-a-sharepoint-site\nsearches-over-the-title-and-the-body-of-the-pages",
        description: "get",
        isRoot: false,
      },
    ],
    specName: "sharepoint-pages.yml",
  },
  {
    title: "Tasks",
    url: "/api-docs/tasks",
    isRoot: true,
    children: [
      {
        title: "Get all tasks",
        url: "/api-docs/tasks#get-all-tasks",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get task assignments",
        url: "/api-docs/tasks#get-task-assignments",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get number of tasks",
        url: "/api-docs/tasks#get-number-of-tasks",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get task assignments",
        url: "/api-docs/tasks#get-task-assignments",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get a summary for the task assignments.",
        url: "/api-docs/tasks#get-a-summary-for-the-task-assignments",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get all task comments",
        url: "/api-docs/tasks#get-all-task-comments",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get paginated reactions to a task comment",
        url: "/api-docs/tasks#get-paginated-reactions-to-a-task-comment",
        description: "get",
        isRoot: false,
      },
      {
        title: "Create a new task",
        url: "/api-docs/tasks#create-a-new-task",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create new task assignment",
        url: "/api-docs/tasks#create-new-task-assignment",
        description: "post",
        isRoot: false,
      },
      {
        title: "Marking a task assignment as finished",
        url: "/api-docs/tasks#marking-a-task-assignment-as-finished",
        description: "post",
        isRoot: false,
      },
      {
        title: "Marking a task assignment as open",
        url: "/api-docs/tasks#marking-a-task-assignment-as-open",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create multiple task assignments",
        url: "/api-docs/tasks#create-multiple-task-assignments",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create a task comment",
        url: "/api-docs/tasks#create-a-task-comment",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create new task comment reaction",
        url: "/api-docs/tasks#create-new-task-comment-reaction",
        description: "post",
        isRoot: false,
      },
      {
        title: "Delete a task",
        url: "/api-docs/tasks#delete-a-task",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete existing task assignment",
        url: "/api-docs/tasks#delete-existing-task-assignment",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete multiple task assignments",
        url: "/api-docs/tasks#delete-multiple-task-assignments",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete existing task comment",
        url: "/api-docs/tasks#delete-existing-task-comment",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete task comment reaction",
        url: "/api-docs/tasks#delete-task-comment-reaction",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Modify/Update existing task",
        url: "/api-docs/tasks#modify/update-existing-task",
        description: "patch",
        isRoot: false,
      },
      {
        title: "Update task comment reaction",
        url: "/api-docs/tasks#update-task-comment-reaction",
        description: "patch",
        isRoot: false,
      },
    ],
    specName: "tasks.yml",
  },
];
