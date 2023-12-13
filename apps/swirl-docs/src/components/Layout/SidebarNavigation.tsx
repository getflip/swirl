import { forwardRef, useEffect, useRef, useState } from "react";
import {
  Tag,
  mapHttpMethodToTagContent,
  mapHttpMethodToTagScheme,
} from "../Tags";

import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";
import { NavItem } from "@swirl/lib/navigation/";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HttpMethods } from "oas/dist/rmoas.types";
import { useDocumentationLayoutContext } from "./DocumentationLayoutContext";
import { AnimatePresence, motion } from "framer-motion";

const CategoryNavSubItem = ({
  navItem,
  activePath,
  isCurrentlyInView,
}: {
  navItem: NavItem;
  activePath: string;
  isCurrentlyInView: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const activePathWithoutHash = activePath.split("#")[0] + "/";
  const navItemPath = navItem.url.split("#")[0] + "/";

  const isActive =
    activePathWithoutHash.startsWith(navItemPath) ||
    (navItem.children || []).some((child) =>
      activePathWithoutHash.startsWith(child.url.split("#")[0] + "/")
    );

  useEffect(() => {
    setIsExpanded(isActive);
  }, [isActive]);

  return (
    <>
      <li className={classNames("flex flex-col justify-center")}>
        <div className="flex justify-between items-center py-2">
          {navItem.isRoot ? (
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
            >
              <span>{navItem.title.replaceAll("-", " ")}</span>
            </Link>
          ) : (
            <WrappingAnchor
              href={navItem.url}
              item={navItem}
              isCurrentPath={activePath.includes(navItem.url)}
            />
          )}
          {navItem.children && (
            <button
              aria-label="Toggle"
              className="flex justify-center items-center text-text-subdued"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <Image
                className={classNames(
                  {
                    "animate-rotate-in": isExpanded,
                    "animate-rotate-out": !isExpanded,
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItem.children.map((item) => (
                <CategoryNavSubItem
                  activePath={activePath}
                  isCurrentlyInView={false}
                  key={item.url}
                  navItem={item}
                ></CategoryNavSubItem>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    </>
  );
};

const WrappingAnchor = forwardRef<
  HTMLAnchorElement,
  { item: NavItem; isCurrentPath: boolean; href: string }
>(({ item, isCurrentPath, href }, ref) => {
  const [isWrapping, setIsWrapping] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsWrapping(190 < textRef.current.scrollWidth);
    }
  }, [item.title]); // Re-run effect when the item.title changes

  const alignmentClass = isWrapping ? "items-start" : "items-center";

  return (
    <Link
      href={href}
      ref={ref}
      aria-current={isCurrentPath}
      className={classNames(
        "flex",
        alignmentClass,
        "w-full",
        "text-sm capitalize leading-5",
        "hover:text-border-info",
        {
          "text-border-info": isCurrentPath,
          "text-text-default": !isCurrentPath,
          "-ml-4": item.tag,
        }
      )}
    >
      {item.tag && (
        <Tag
          content={mapHttpMethodToTagContent(item.tag)}
          scheme={mapHttpMethodToTagScheme(item.tag as HttpMethods)}
          httpTag
        />
      )}
      <span ref={textRef}>{item.title}</span>
    </Link>
  );
});

WrappingAnchor.displayName = "WrappingAnchor";

export function SidebarNavigation() {
  const { navigationLinks: categoryLinkList } = useDocumentationLayoutContext();
  const router = useRouter();
  const activePath = router.asPath;

  return (
    <nav
      aria-label="category"
      className={classNames(
        "hidden lg:block px-4 border-r-1 min-h-full w-80 min-w-[20rem] max-w-xs",
        "overflow-auto",
        { invisible: router.asPath.includes("/icons") }
      )}
    >
      {router.asPath.includes("/api-docs") && (
        <>
          {process.env.NEXT_PUBLIC_DEPLOYMENT_STAGE !== "production" && (
            <>
              <ul className="mt-6">
                {apiDocsNavItems?.map((navItem: NavItem, index) => {
                  return (
                    <CategoryNavSubItem
                      isCurrentlyInView={activePath.includes(navItem.url)}
                      key={navItem.title + `-${index}`}
                      navItem={navItem}
                      activePath={activePath}
                    />
                  );
                })}
              </ul>
              <hr className="mt-6" />
            </>
          )}
          <div className="flex mt-6 align-center h-10 max-h-10">
            <h4 className="text-font-size-sm leading-6 font-font-weight-bold text-[#8E8E93]">
              APIs
            </h4>
          </div>
          <ul>
            {categoryLinkList?.map((navItem: NavItem, index) => {
              return (
                <CategoryNavSubItem
                  isCurrentlyInView={activePath.includes(navItem.url)}
                  key={navItem.title + `-${index}`}
                  navItem={navItem}
                  activePath={activePath}
                />
              );
            })}
          </ul>
        </>
      )}

      {router.asPath.includes("/api-docs") && (
        <>
          <hr className="mt-8" />
          <div className="mt-8">
            <div className="h-10 inline-flex items-center justify-center">
              <h4 className="text-font-size-sm leading-6 font-font-weight-bold text-[#8E8E93]">
                Legacy APIs
              </h4>
            </div>
            <ul className="w-full">
              <LegacyApiLink
                href="https://base.flip-app.com/openapi/external/post"
                label="Public Post API"
              />
              <LegacyApiLink
                href="https://base.flip-app.com/openapi/external/sync"
                label="Public Users- and Groups-Sync-API"
              />
            </ul>
          </div>
        </>
      )}

      {!router.asPath.includes("/api-docs") && (
        <ul className="mt-6">
          {categoryLinkList?.map((navItem: NavItem, index) => {
            return (
              <CategoryNavSubItem
                isCurrentlyInView={activePath.includes(navItem.url)}
                key={navItem.title + `-${index}`}
                navItem={navItem}
                activePath={activePath}
              />
            );
          })}
        </ul>
      )}
    </nav>
  );
}

function LegacyApiLink({ href, label }: { href: string; label: string }) {
  return (
    <li className="w-full">
      <Link
        href={href}
        target="_blank"
        className={classNames(
          "inline-flex justify-between items-center w-full h-10",
          "text-font-size-sm leading-5 text-text-default",
          "hover:text-border-info"
        )}
      >
        {label}
        <span>
          <i className="swirl-icons-OpenInNew28 text-base ml-1"></i>
        </span>
      </Link>
    </li>
  );
}
