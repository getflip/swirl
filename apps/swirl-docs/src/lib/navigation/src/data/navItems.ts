import { NavItem } from "../navigation.model";

export const navItems: NavItem[] = [
  {
    title: "Foundations",
    isRoot: true,
    children: [
      {
        title: "About Swirl",
        url: "/",
        description:
          "Learn what the swirl design system is and how it's used by designers and developers to build world-class flip admin experiences.",
      },
    ],
  },
  {
    title: "Components",
    url: "/components",
    isRoot: true,
  },
  {
    title: "Tokens",
    children: [
      {
        title: "Border",
        url: "/tokens/border",
        description:
          "Border tokens are used to define the border of an element.",
      },
      {
        title: "Color",
        url: "/tokens/color",
        description:
          "Border tokens are used to define the border of an element.",
      },
      {
        title: "Spacing",
        url: "/tokens/spacing",
        description:
          "Border tokens are used to define the border of an element.",
      },
      {
        title: "Token List",
        url: "/tokens/token-list",
        description:
          "Border tokens are used to define the border of an element.",
      },
      {
        title: "Typography",
        url: "/tokens/typography",
        description:
          "Border tokens are used to define the border of an element.",
      },
    ],
  },
  {
    title: "Icons",
    url: "/icons",
    isRoot: true,
  },
];
