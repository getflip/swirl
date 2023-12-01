import classNames from "classnames";
import { OpenSearchButton } from "../OpenSearchButton";
import List from "./List";

interface MobileNavProps {
  isOpen: boolean;
  handleCloseMenu: () => void;
}

const MobileNav = ({ isOpen, handleCloseMenu }: MobileNavProps) => {
  return (
    <nav
      id="mobile-navigation"
      aria-label="main"
      className={classNames("overflow-y-scroll bg-white", {
        "absolute w-full left-0 top-[64px] pt-4": isOpen,
      })}
    >
      <div
        className={classNames(
          "w-full pb-2 px-4",
          { block: isOpen },
          { hidden: !isOpen }
        )}
      >
        <OpenSearchButton />
      </div>
      <List isOpen={isOpen} handleCloseMenu={handleCloseMenu} />
    </nav>
  );
};

export default MobileNav;
