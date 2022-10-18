export type NavLink = {
  name: string;
  path: string;
  subpages?: NavLink[];
};

export type NavItem = {
  title: string;
  isRoot?: boolean;
  url: string;
  children?: NavItem[];
  description?: string;
};
