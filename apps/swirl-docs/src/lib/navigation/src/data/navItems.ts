import { CategoryEnum, NavItem } from "../navigation.model";
import { componentsNavItems } from "./components.data";
import { foundationsNavItems } from "./foundations.data";
import { iconsNavItems } from "./iconsChildren.data";
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
    url: "/tokens",
    children: tokensNavItems,
  },
  {
    title: CategoryEnum.ICONS,
    url: "/icons",
    isRoot: true,
    children: iconsNavItems,
  },
];
