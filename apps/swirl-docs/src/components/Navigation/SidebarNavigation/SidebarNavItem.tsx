import { NavItem } from "@swirl/lib/navigation/";
import classNames from "classnames";
import Link from "next/link";
import { HttpMethods } from "oas/dist/rmoas.types";
import { forwardRef, useRef } from "react";
import {
  Tag,
  mapHttpMethodToTagContent,
  mapHttpMethodToTagScheme,
} from "../../Tags";

export const SidebarNavItem = forwardRef<
  HTMLAnchorElement,
  {
    item: NavItem;
    isCurrentPath: boolean;
    href: string;

    handleCloseMenu?: () => void;
  }
>(function WrappingAnchor({ item, isCurrentPath, href, handleCloseMenu }, ref) {
  const textRef = useRef<HTMLSpanElement>(null);

  return (
    <Link
      href={href}
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
          "-ml-4": item.tag,
        }
      )}
      target={item.isExternal ? "_blank" : undefined}
      onClick={handleCloseMenu}
    >
      {item.tag && (
        <Tag
          content={mapHttpMethodToTagContent(item.tag)}
          scheme={mapHttpMethodToTagScheme(item.tag as HttpMethods)}
          httpTag
        />
      )}
      <span
        ref={textRef}
        className="align-middle leading-5 flex w-full justify-between"
      >
        {item.title}
        {item.isExternal && (
          <span>
            <i className="swirl-icons-OpenInNew28 text-base ml-1"></i>
          </span>
        )}
      </span>
    </Link>
  );
});
