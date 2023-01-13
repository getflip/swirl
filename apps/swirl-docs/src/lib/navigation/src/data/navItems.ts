import { CategoryEnum, NavItem } from "../navigation.model";
import { componentsNavItems } from "./components.data";
import { tokensNavItems } from "./tokens.data";

export const navItems: NavItem[] = [
  // {
  //   title: CategoryEnum.FOUNDATIONS,
  //   isRoot: true,
  //   url: "/foundations",
  //   children: foundationsNavItems,
  // },
  {
    title: CategoryEnum.COMPONENTS,
    url: "/components",
    isRoot: true,
    children: componentsNavItems,
  },
  {
    title: CategoryEnum.TOKENS,
    url: "/tokens/color",
    children: tokensNavItems,
  },
  {
    title: CategoryEnum.ICONS,
    url: "/icons",
    isRoot: true,
  },
];
