import { SwirlIconChevronLeft } from "@getflip/swirl-components-react";
import { isProdDeployment } from "@swirl/lib/env";
import { NavItem, navItems } from "@swirl/lib/navigation";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NavItemStrategy } from "../components/NavItemStrategy";
import { MobileNavTopLevelItem } from "./MobileNavTopLevelItem";

interface MobileNavProps {
  isOpen: boolean;
  handleCloseMenu: () => void;
}

const MobileNav = ({ isOpen, handleCloseMenu }: MobileNavProps) => {
  const router = useRouter();
  const activePath = router.asPath;

  const pathBase = activePath.split("/")[1];

  const activeNavItemBase = pathBase
    ? navItems.find((item) => item.url?.startsWith("/" + pathBase))
    : undefined;

  const [topLevelSelection, setTopLevelSelection] = useState<
    NavItem | undefined
  >(activeNavItemBase);

  useEffect(() => {
    setTopLevelSelection(activeNavItemBase);
  }, [activeNavItemBase]);

  const showTopLevel = !!topLevelSelection?.children?.length;

  const onTopLevelNavClick = (navItem: NavItem) => {
    if (navItem.children?.length) {
      setTopLevelSelection(navItem);
    } else {
      handleCloseMenu();
    }
  };

  return (
    <nav
      id="mobile-navigation"
      aria-label="main"
      className={classNames(
        "overflow-y-scroll  bg-white",
        "absolute left-0 top-[64px] w-full",
        {
          "h-0": !isOpen,
          "h-[calc(100vh_-_64px)]": isOpen,
        }
      )}
    >
      {isOpen && !showTopLevel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {navItems
            .filter((navItem) => !isProdDeployment || !navItem.devOnly)
            .map((navItem) => (
              <MobileNavTopLevelItem
                navItem={navItem}
                key={navItem.title}
                onClick={() => onTopLevelNavClick(navItem)}
                active={navItem === activeNavItemBase}
              />
            ))}
        </div>
      )}
      {isOpen && topLevelSelection && showTopLevel && (
        <>
          <div
            className="flex gap-2 justify-start items-center font-medium p-4 pointer-cursor"
            onClick={() => setTopLevelSelection(undefined)}
          >
            <SwirlIconChevronLeft />
            {topLevelSelection.title}
          </div>
          <hr />
          <ul className="p-4">
            {topLevelSelection.children?.map((navItem) => (
              <NavItemStrategy
                handleCloseMenu={handleCloseMenu}
                activePath={activePath}
                navItem={navItem}
                key={navItem.title}
              />
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export default MobileNav;
