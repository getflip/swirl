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
import { useEffect, useState } from "react";
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

  const listItem = {
    hidden: { x: -10, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.125,
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
              <span>{navItem.title}</span>
            </a>
          </Link>
          {navItem.children && (
            <button
              aria-label="Expand"
              className="flex justify-center items-center"
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
                  <motion.li
                    key={index}
                    className="flex items-center ml-6"
                    variants={listItem}
                  >
                    <Link href={`${item.url}`}>
                      <a
                        aria-current={activePath === navItem.url}
                        className={classNames(
                          "flex items-center w-full",
                          "text-sm capitalize leading-5",
                          "hover:text-border-info",
                          {
                            "text-border-info": isCurrentPath,
                            "text-text-default": !isCurrentPath,
                          }
                        )}
                      >
                        <Tag
                          content={mapHttpMethodToTagContent(item.description!)}
                          scheme={mapHttpMethodToTagScheme(
                            item.description as HttpMethods
                          )}
                          httpTag
                        />
                        <span>{item.title}</span>
                      </a>
                    </Link>
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

export function CategoryNav() {
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
    </nav>
  );
}
