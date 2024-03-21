import { isProdDeployment } from "@swirl/lib/env";
import { NavItem, navItems } from "@swirl/lib/navigation/";
import classNames from "classnames";
import { useRouter } from "next/router";
import { NavItemStrategy } from "../components/NavItemStrategy";

export const ANIMATION_OPENED = { opacity: 1, height: "auto" };
export const ANIMATION_CLOSED = { opacity: 0, height: 0 };

export function SidebarNavigation() {
  const router = useRouter();
  const activePath = router.asPath;

  const pathBase = activePath.split("/")[1];
  const navItemBase = navItems.find((item) =>
    item.url?.startsWith("/" + pathBase)
  );

  if (navItemBase?.devOnly && isProdDeployment) {
    return null;
  }

  const navChildren = navItemBase?.children;

  if (!navChildren?.length) {
    return null;
  }

  return (
    <nav
      aria-label="category"
      className={classNames(
        "hidden lg:block px-4 border-r-1 min-h-full w-80 min-w-[20rem] max-w-xs",
        "overflow-y-auto",
        { invisible: router.asPath.includes("/icons") }
      )}
    >
      <ul className="mt-6">
        {navChildren.map((navItem: NavItem, index) => {
          return (
            <NavItemStrategy
              key={navItem.title + `-${index}`}
              activePath={activePath}
              navItem={navItem}
            />
          );
        })}
      </ul>
    </nav>
  );
}
