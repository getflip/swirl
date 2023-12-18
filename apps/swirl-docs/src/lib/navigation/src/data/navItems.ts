import { CategoryEnum, NavItem } from "../navigation.model";
import { apiSpecsNavItems } from "./apiSpecs.data";
import { tokensNavItems } from "./tokens.data";
import { apiDocsNavItems } from "./apiDocs.data";

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
    title: CategoryEnum.API,
    url: apiDocsNavItems[0].url,
    isRoot: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The quick brown fox jumps over the lazy dog.",
    children: apiSpecsNavItems,
  },
];
