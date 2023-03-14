import { FunctionComponent, useEffect, useState } from "react";
import { NavItem } from "@swirl/lib/navigation/";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useDocumentationLayoutContext } from "./DocumentationLayoutContext";

export function CategoryNav() {
  const { navigationLinks: categoryLinkList } = useDocumentationLayoutContext();
  const router = useRouter();
  const activePath = router.asPath;

  // TODO: Implement when "Foundations"-Category is created
  // const RootElement = ({ navItem }: { navItem: NavItem }) => (
  //   <ul>
  //     <li
  //       key={navItem.title}
  //       className={`font-sm mb-4 ${
  //         activePath?.includes(navItem.url!!) ? "text-border-info" : null
  //       }`}
  //     >
  //       <h4 className="font-bold text-text-subdued text-sm">
  //         {capitalizeFirstLetter(navItem.title)}
  //       </h4>
  //     </li>
  //   </ul>
  // );

  const SubElement = ({ navItem }: { navItem: NavItem }) => (
    <li
      className={classNames("font-sm mb-4", "hover:text-border-info", {
        "text-border-info": activePath === navItem.url,
        "text-text-default": activePath !== navItem.url,
      })}
    >
      <Link href={`${navItem.url}`}>
        <a className="text-sm capitalize">{navItem.title}</a>
      </Link>
    </li>
  );

  return (
    <nav
      aria-label="category"
      className={classNames(
        "hidden lg:block px-4 border-r-1 w-80 min-w-[20rem] max-w-xs",
        { invisible: router.asPath.includes("/icons") }
      )}
    >
      <ul className="mt-6">
        {categoryLinkList?.map((navItem: NavItem, index) => {
          return (
            <SubElement key={navItem.title + `-${index}`} navItem={navItem} />
          );
        })}
      </ul>
    </nav>
  );
}
