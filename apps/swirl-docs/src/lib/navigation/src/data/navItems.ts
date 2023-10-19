import { CategoryEnum, NavItem } from "../navigation.model";
import { apiSpecsNavItems } from "./apiSpecs.data";
import { tokensNavItems } from "./tokens.data";

export const navItems: NavItem[] = [
  {
    title: CategoryEnum.TOKENS,
    url: "/tokens/color",
    children: tokensNavItems,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The quick brown fox jumps over the lazy dog.",
  },
  {
    title: CategoryEnum.ICONS,
    url: "/icons",
    isRoot: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The quick brown fox jumps over the lazy dog.",
  },
  {
    title: "APIs and References",
    url: "/api-docs/tasks",
    isRoot: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The quick brown fox jumps over the lazy dog.",
    children: apiSpecsNavItems,
  },
];
