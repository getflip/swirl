import { NavItem } from "@swirl/lib/navigation/";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useDocumentationLayoutContext } from "./DocumentationLayoutContext";
import {
  Tag,
  mapHttpMethodToTagContent,
  mapHttpMethodToTagScheme,
} from "../Tags";
import { HttpMethods } from "oas/dist/rmoas.types";
import Image from "next/image";
import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";

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

  const list = {
    hidden: { opacity: 0, height: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.01,
      },
    },
  };

  useEffect(() => {
    if (activePath.includes(navItem.url)) {
      setIsExpanded(true);
    }
  }, [navItem.url, activePath]);

  return (
    <>
      <li
        className={classNames(
          "flex flex-col justify-center",
          { "h-10 max-h-10": !isExpanded },
          { "h-full": isExpanded }
        )}
      >
        <div className="flex justify-between items-center h-10">
          <Link href={`${navItem.url}`}>
            <a
              className={classNames(
                "text-sm capitalize w-full",
                "hover:text-border-info",
                {
                  "text-text-default": !isCurrentlyInView,
                  "text-border-info": isCurrentlyInView,
                }
              )}
            >
              <span>{navItem.title.replaceAll("-", " ")}</span>
            </a>
          </Link>
          {navItem.children && (
            <button
              aria-label="Expand"
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
      </li>
      <li>
        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              className={classNames(
                "flex flex-col gap-y-4",
                "border-l-[1px] border-border-default overflow-hidden",
                { "h-0": !isExpanded },
                { "h-auto": isExpanded }
              )}
              initial="hidden"
              exit={{ opacity: 0, height: 0 }}
              animate={isExpanded ? "show" : "hidden"}
              variants={list}
            >
              {navItem.children?.map((item, index) => {
                const isCurrentPath = activePath.includes(item.url);

                return (
                  <motion.li key={index} className="flex items-center ml-6">
                    <WrappingAnchor
                      href={`${item.url}`}
                      item={item}
                      isCurrentPath={isCurrentPath}
                    />
                  </motion.li>
                );
              })}
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
    <Link href={href}>
      <a
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
          }
        )}
      >
        {item.description && (
          <Tag
            content={mapHttpMethodToTagContent(item.description!)}
            scheme={mapHttpMethodToTagScheme(item.description as HttpMethods)}
            httpTag
          />
        )}
        <span ref={textRef}>{item.title}</span>
      </a>
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
          {apiDocsNavItems.length > 0 && (
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
            {apiSpecsNavItems?.map((navItem: NavItem, index) => {
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
    </nav>
  );
}

function LegacyApiLink({ href, label }: { href: string; label: string }) {
  return (
    <li className="w-full">
      <Link href={href}>
        <a
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
        </a>
      </Link>
    </li>
  );
}
