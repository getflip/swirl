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
    title: "Tokens",
    children: [
      {
        title: "Overview",
        url: "/tokens",
        description: "Learn about the tokens used in the swirl design system.",
      },
      {
        title: "Color",
        url: "/tokens/color",
        description:
          "The Tokens of our Color System. From Interaction to Surface Colors.",
      },
      {
        title: "Typography",
        url: "/tokens/typography",
        description:
          "Tokens regarding Font-Weight, Font-Family, Line-Height, Letter-Spacing.",
      },
      {
        title: "Border",
        url: "/tokens/border",
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
        title: "zIndex",
        url: "/tokens/z-index",
        description:
          "zIndex tokens are used to define the z-index of an element.",
      },
    ],
  },
  {
    title: "Icons",
    url: "/icons",
    isRoot: true,
    children: [
      {
        title: "Overview",
        url: "/icons",
        description: "Learn about the icons used in the swirl design system.",
      },
      {
        title: "Getting started",
        url: "/icons/getting-started",
        description: "Learn about the tokens used in the swirl design system.",
      },
      {
        title: "How to build icons",
        url: "/icons/how-to-build-icons",
        description: "Learn how to build icons for the swirl design system.",
      },
    ],
  },
  // {
  //   title: "Components",
  //   url: "/components",
  //   isRoot: true,
  // },
];
