import { NavItem } from "@swirl/lib/navigation";
import { NavItemChild } from "./NavItemChild";
import { NavItemHeader } from "./NavItemHeader";
import { NavItemWithChildren } from "./NavItemWithChildren";

export const NavItemStrategy = ({
  navItem,
  activePath,
  handleCloseMenu,
}: {
  navItem: NavItem;
  activePath: string;
  handleCloseMenu?: () => void;
}) => {
  if (navItem.isHeader) {
    return <NavItemHeader navItem={navItem} />;
  } else if (navItem.children?.length) {
    return (
      <NavItemWithChildren
        navItem={navItem}
        activePath={activePath}
        handleCloseMenu={handleCloseMenu}
      />
    );
  } else {
    return (
      <NavItemChild
        navItem={navItem}
        activePath={activePath}
        handleCloseMenu={handleCloseMenu}
      />
    );
  }
};
