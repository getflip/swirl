import { NavItem, navItems } from "@swirl/lib/navigation";
import ListItemStrategy from "./ListItemStrategy";
import classNames from "classnames";

export default function List({
  isOpen,
  handleCloseMenu,
}: {
  isOpen: boolean;
  handleCloseMenu: () => void;
}) {
  return (
    <ul
      className={classNames(
        "z-40 w-full h-[calc(100vh_-_64px)] max-h-[calc(100vh_-_64px)] bg-white",
        { block: isOpen },
        { hidden: !isOpen }
      )}
    >
      {navItems.map((navItem: NavItem, index: number) => (
        <ListItemStrategy
          key={`${navItem}-${index}`}
          currentPath="/"
          item={navItem}
          ariaId={index}
          handleCloseMenu={handleCloseMenu}
        />
      ))}
    </ul>
  );
}
