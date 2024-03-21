import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";
import { NavItem } from "@swirl/lib/navigation/";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ANIMATION_CLOSED, ANIMATION_OPENED } from "../SidebarNavigation";
import { NavItemStrategy } from "./NavItemStrategy";

export const NavItemWithChildren = ({
  navItem,
  activePath,
  handleCloseMenu,
}: {
  navItem: NavItem;
  activePath: string;
  handleCloseMenu?: () => void;
}) => {
  const activePathWithoutHash = activePath.replace("#", "/") + "/";
  const navItemPath = navItem.url?.replace("#", "/") + "/";

  const isActive =
    activePathWithoutHash.startsWith(navItemPath) ||
    (navItem.children || []).some((child) =>
      activePathWithoutHash.startsWith(child.url?.replace("#", "/") + "/")
    );

  const [{ isExpanded, isToggled }, setState] = useState(() => ({
    isExpanded: isActive,
    isToggled: false,
  }));

  function toggleExpanded() {
    setState({ isToggled: true, isExpanded: !isExpanded });
  }

  useEffect(() => {
    if (isExpanded != isActive) {
      setState({ isToggled: true, isExpanded: isActive });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePathWithoutHash]);

  const textClasses = classNames(
    "text-sm capitalize w-full",
    "hover:text-border-info",
    {
      "text-text-default": !isActive,
      "text-border-info": isActive && !navItem.tag && !navItem.children,
      "font-semibold": isActive,
    }
  );

  return (
    <>
      <li className={classNames("flex flex-col justify-center")}>
        <div className="flex justify-between items-center py-2">
          {navItem.url ? (
            <Link
              href={`${navItem.url}`}
              className={textClasses}
              onClick={handleCloseMenu}
            >
              {navItem.title}
            </Link>
          ) : (
            <div className={textClasses}>{navItem.title}</div>
          )}
          <NavExpandButton
            isExpanded={isExpanded}
            isToggled={isToggled}
            onClick={toggleExpanded}
          />
        </div>
        <AnimatePresence>
          {navItem.children && isExpanded && (
            <motion.ul
              className="pl-4"
              key={navItem.url + "-children"}
              initial={isToggled ? ANIMATION_CLOSED : ANIMATION_OPENED}
              animate={ANIMATION_OPENED}
              exit={ANIMATION_CLOSED}
            >
              {navItem.children.map((item) => (
                <NavItemStrategy
                  key={item.url}
                  navItem={item}
                  activePath={activePath}
                  handleCloseMenu={handleCloseMenu}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    </>
  );
};

function NavExpandButton({
  isExpanded,
  isToggled,
  onClick,
}: {
  isExpanded: boolean;
  isToggled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label="Toggle"
      className="flex justify-center items-center text-text-subdued"
      onClick={onClick}
      aria-expanded={isExpanded}
    >
      <Image
        className={classNames(
          {
            "animate-rotate-in": isToggled && isExpanded,
            "animate-rotate-out": isToggled && !isExpanded,
          },
          { "rotate-90": isExpanded }
        )}
        alt=""
        src={icon.src}
        width={24}
        height={24}
      />
    </button>
  );
}
