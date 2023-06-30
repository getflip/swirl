import { NavItem } from "../navigation.model";

export const apiDocsNavItems: NavItem[] = [
  {
    title: "auaua",
    url: "/api-docs/auaua",
    isRoot: true,
    children: [{ title: "auaua/test3", url: "/api-docs/docs/auaua/test3" }],
  },
  { title: "test", url: "/api-docs/docs/test" },
  {
    title: "testing",
    url: "/api-docs/testing",
    isRoot: true,
    children: [
      { title: "testing/test1", url: "/api-docs/docs/testing/test1" },
      { title: "testing/test2", url: "/api-docs/docs/testing/test2" },
    ],
  },
];
