export type Link = {
  name: string;
  path: string;
  subpages?: Link[];
};

export type NavItem = {
  title: string;
  isRoot?: boolean;
  url?: string;
  children?: NavItem[];
  description?: string;
};
