import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";
import { NavItem } from "@swirl/lib/navigation/";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ANIMATION_CLOSED, ANIMATION_OPENED } from ".";
import { SidebarNavItem } from "./SidebarNavItem";

export const SidebarNavSubItem = ({
  navItem,
  activePath,
  isCurrentlyInView,
  handleCloseMenu,
}: {
  navItem: NavItem;
  activePath: string;
  isCurrentlyInView: boolean;
  handleCloseMenu?: () => void;
}) => {
  const activePathWithoutHash = activePath.split("#")[0] + "/";
  const navItemPath = navItem.url?.split("#")[0] + "/";

  const isActive =
    activePathWithoutHash.startsWith(navItemPath) ||
    (navItem.children || []).some((child) =>
      activePathWithoutHash.startsWith(child.url?.split("#")[0] + "/")
    );

  const [{ isExpanded, isToggled }, setState] = useState(() => ({
    isExpanded: isActive,
    isToggled: false,
  }));

  function toggleExpanded(expanded: boolean) {
    setState({ isToggled: true, isExpanded: expanded });
  }

  useEffect(() => {
    if (isExpanded != isActive) {
      toggleExpanded(isActive);
    }
  }, [activePathWithoutHash]);

  return (
    <>
      <li className={classNames("flex flex-col justify-center")}>
        <div className="flex justify-between items-center py-2">
          {navItem.url ? (
            navItem.isRoot ? (
              <Link
                href={`${navItem.url}`}
                className={classNames(
                  "text-sm capitalize w-full",
                  "hover:text-border-info",
                  {
                    "text-text-default": !isCurrentlyInView,
                    "text-border-info":
                      isCurrentlyInView && !navItem.tag && !navItem.children,
                    "font-semibold": isActive,
                  }
                )}
                onClick={handleCloseMenu}
              >
                <span>{navItem.title.replaceAll("-", " ")}</span>
              </Link>
            ) : (
              <SidebarNavItem
                href={navItem.url}
                item={navItem}
                isCurrentPath={activePath.includes(navItem.url)}
                handleCloseMenu={handleCloseMenu}
              />
            )
          ) : navItem.isHeader ? (
            <div className="grow">
              <hr className="mt-3"></hr>
              <div className="font-medium mt-5">{navItem.title}</div>
            </div>
          ) : (
            <div className="my-2">{navItem.title}</div>
          )}
          {navItem.children && (
            <button
              aria-label="Toggle"
              className="flex justify-center items-center text-text-subdued"
              onClick={() => toggleExpanded(!isExpanded)}
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
          )}
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
                <SidebarNavSubItem
                  activePath={activePath}
                  isCurrentlyInView={false}
                  key={item.url}
                  navItem={item}
                  handleCloseMenu={handleCloseMenu}
                ></SidebarNavSubItem>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    </>
  );
};
