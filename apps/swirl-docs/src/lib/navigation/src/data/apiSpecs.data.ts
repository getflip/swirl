import { NavItem } from "../navigation.model";

export const apiSpecsNavItems: NavItem[] = [
  {
    title: "Tasks",
    url: "/api-docs/tasks",
    isRoot: true,
    children: [
      {
        title: "Get all tasks",
        url: "/api-docs/tasks#get-tasks",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get task assignments",
        url: "/api-docs/tasks#get-task-assignments-by-actor",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get number of tasks",
        url: "/api-docs/tasks#get-tasks-assignments-summary",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get task assignments",
        url: "/api-docs/tasks#get-task-assignments-by-task",
        description: "get",
        isRoot: false,
      },
      {
        title: "Search recipients for a task",
        url: "/api-docs/tasks#search-task-recipients",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get a summary for the task assignments.",
        url: "/api-docs/tasks#get-task-assignments-summary",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get all task comments",
        url: "/api-docs/tasks#get-tasks-comments",
        description: "get",
        isRoot: false,
      },
      {
        title: "Get paginated reactions to a task comment",
        url: "/api-docs/tasks#get-task-comment-reactions",
        description: "get",
        isRoot: false,
      },
      {
        title: "Create a new task",
        url: "/api-docs/tasks#create-task",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create new task assignment",
        url: "/api-docs/tasks#create-task-assignment",
        description: "post",
        isRoot: false,
      },
      {
        title: "Marking a task assignment as finished",
        url: "/api-docs/tasks#finish-task-assignment",
        description: "post",
        isRoot: false,
      },
      {
        title: "Marking a task assignment as open",
        url: "/api-docs/tasks#open-task-assignment",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create multiple task assignments",
        url: "/api-docs/tasks#batch-create-task-assignments",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create a task comment",
        url: "/api-docs/tasks#create-task-comment",
        description: "post",
        isRoot: false,
      },
      {
        title: "Create new task comment reaction",
        url: "/api-docs/tasks#create-task-comment-reaction",
        description: "post",
        isRoot: false,
      },
      {
        title: "Delete a task",
        url: "/api-docs/tasks#delete-task",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete existing task assignment",
        url: "/api-docs/tasks#delete-task-assignment",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete multiple task assignments",
        url: "/api-docs/tasks#batch-delete-task-assignments",
        description: "delete",
        isRoot: false,
      },
      {
        title: "Delete existing task comment",
        url: "/api-docs/tasks#delete-task-comment",
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
        url: "/api-docs/tasks#update-task",
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
