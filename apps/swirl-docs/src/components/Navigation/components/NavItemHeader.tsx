import { NavItem } from "@swirl/lib/navigation";

export const NavItemHeader = ({ navItem }: { navItem: NavItem }) => (
  <li className="py-2">
    <hr className="pb-5"></hr>
    <h4 className="text-font-size-sm font-font-weight-bold text-text-subdued">
      {navItem.title}
    </h4>
  </li>
);
