import { NavItem } from "@swirl/lib/navigation/";
import classNames from "classnames";
import Link from "next/link";
import { HttpMethods } from "oas/dist/rmoas.types";
import { forwardRef } from "react";
import {
  Tag,
  mapHttpMethodToTagContent,
  mapHttpMethodToTagScheme,
} from "../../Tags";

export const NavItemChild = forwardRef<
  HTMLAnchorElement,
  {
    navItem: NavItem;
    activePath: string;
    handleCloseMenu?: () => void;
  }
>(function NavItemChild({ navItem, activePath, handleCloseMenu }, ref) {
  const isCurrentPath = navItem.url === activePath;

  return (
    <li className={classNames("flex justify-between items-center py-2")}>
      <Link
        href={navItem.url || "#"}
        ref={ref}
        aria-current={isCurrentPath}
        className={classNames(
          "flex",
          "items-start",
          "w-full",
          "text-sm capitalize leading-5",
          "hover:text-border-info",
          {
            "text-border-info": isCurrentPath,
            "text-text-default": !isCurrentPath,
            "-ml-4": navItem.tag,
          }
        )}
        target={navItem.isExternal ? "_blank" : undefined}
        onClick={handleCloseMenu}
      >
        {navItem.tag && (
          <Tag
            content={mapHttpMethodToTagContent(navItem.tag)}
            scheme={mapHttpMethodToTagScheme(navItem.tag as HttpMethods)}
            httpTag
          />
        )}
        <span className="align-middle leading-5 flex w-full justify-between">
          {navItem.title}
          {navItem.isExternal && (
            <span>
              <i className="swirl-icons-OpenInNew28 text-base ml-1"></i>
            </span>
          )}
        </span>
      </Link>
    </li>
  );
});
