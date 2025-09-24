import { CategoryEnum, NavItem } from "../navigation.model";
import { apiDocsNavItems } from "./apiDocs.data";
import { apiSpecsNavItems } from "./apiSpecs.data";
import { tokensNavItems } from "./tokens.data";

export const navItems: NavItem[] = [
  {
    title: CategoryEnum.TOKENS,
    url: "/tokens/color",
    children: tokensNavItems,
    description:
      "Consistent variables defining visual elements, ensuring harmony across platforms.",
    teaserIcon: "/images/teaser-icon-tokens.svg",
  },
  {
    title: CategoryEnum.ICONS,
    url: "/icons",
    description: "A collection of chosen material design and custom icons.",
    teaserIcon: "/images/teaser-icon-icons.svg",
  },
  {
    title: CategoryEnum.API,
    url: apiDocsNavItems[0].url,
    description:
      "Uniform APIs and documents for our Flip system, ensuring seamless integration across platforms.",
    teaserIcon: "/images/teaser-icon-api.svg",
    comingSoon: true,
    children: [
      ...apiDocsNavItems,
      { title: "APIs", isHeader: true },
      ...apiSpecsNavItems,
      { title: "Legacy APIs", isHeader: true },
      {
        title: "Public Post API",
        url: "https://base.flip-app.com/openapi/external/post",
        isExternal: true,
      },
    ],
  },
  {
    title: CategoryEnum.COMPONENTS,
    url: "/components",
    devOnly: true,
    description:
      "Consistent web components for our Flip system, ensuring harmony across platforms.",
    teaserIcon: "/images/teaser-icon-component.svg",
  },
  {
    title: CategoryEnum.FOUNDATIONS,
    url: "/foundations",
    devOnly: true,
    description:
      "Comprehensive Foundations documentation, detailing the design system for consistent harmony across clients.",
    teaserIcon: "/images/teaser-icon-book.svg",
  },
];
