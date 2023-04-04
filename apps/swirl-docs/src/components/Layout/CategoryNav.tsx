import { NavItem } from "@swirl/lib/navigation/";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useDocumentationLayoutContext } from "./DocumentationLayoutContext";
import { Tag, mapHttpMethodToTagScheme } from "../Tags";
import { HttpMethods } from "oas/dist/rmoas.types";

export function CategoryNav() {
  const { navigationLinks: categoryLinkList } = useDocumentationLayoutContext();
  const router = useRouter();
  const activePath = router.asPath;

  console.log(categoryLinkList);

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
    <li className={classNames("mb-4")}>
      <Link href={`${navItem.url}`}>
        <a
          className={classNames(
            "text-sm capitalize",
            "hover:text-border-info",
            {
              "text-border-info": activePath === navItem.url,
              "text-text-default": activePath !== navItem.url,
            }
          )}
        >
          {navItem.title}
        </a>
      </Link>
      {navItem.children && (
        <ul className="mt-2">
          {navItem.children?.map((child, index) => {
            return (
              <li
                key={index}
                className="flex items-center max-h-40 h-10 mb-4 ml-6"
              >
                <Link href={`${child.url}`}>
                  <a
                    className={classNames(
                      "flex items-center",
                      "text-sm capitalize",
                      "hover:text-border-info",
                      {
                        "text-border-info": activePath === navItem.url,
                        "text-text-default": activePath !== navItem.url,
                      }
                    )}
                  >
                    <Tag
                      content={child.description!}
                      scheme={mapHttpMethodToTagScheme(
                        child.description as HttpMethods
                      )}
                    />
                    <span>{child.title}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
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
