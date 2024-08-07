export type NavLink = {
  name: string;
  path: string;
  subpages?: NavLink[];
};

export type NavItem = {
  title: string;
  mdxFilename?: string;
  url?: string;
  isHeader?: boolean;
  isExternal?: boolean;
  devOnly?: boolean;
  comingSoon?: boolean;
  children?: NavItem[];
  description?: string;
  specName?: string;
  tag?: string;
  teaserIcon?: string;
};

export const CategoryEnum = {
  API: "APIs and References",
  FOUNDATIONS: "Foundations",
  COMPONENTS: "Components",
  TOKENS: "Design Tokens",
  ICONS: "Icons",
} as const;
