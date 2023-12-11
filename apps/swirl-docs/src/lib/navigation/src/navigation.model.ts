export type NavLink = {
  name: string;
  path: string;
  subpages?: NavLink[];
};

export type NavItem = {
  title: string;
  url: string;
  isRoot?: boolean;
  children?: NavItem[];
  description?: string;
  specName?: string;
  tag?: string;
};

export const CategoryEnum = {
  FOUNDATIONS: "Foundations",
  COMPONENTS: "Components",
  TOKENS: "Design Tokens",
  ICONS: "Icons",
} as const;
