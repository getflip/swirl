import { FunctionComponent, useEffect, useState } from "react";
import { DocCategory } from "@swirl/lib/docs/src/docs.model";
import { NavItem, navItems } from "@swirl/lib/navigation/";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const CategoryNav: FunctionComponent = () => {
  const [activePath, setActivePath] = useState<string | null>(null);
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const RootElement = ({ navItem }: { navItem: NavItem }) => (
    <li
      key={navItem.title}
      className={`font-sm mb-4 ${
        activePath?.includes(navItem.url!!) ? "text-border-info" : null
      }`}
    >
      <h4 className="font-bold text-text-subdued text-sm">
        {capitalizeFirstLetter(navItem.title)}
      </h4>
    </li>
  );

  const SubElement = ({ navItem }: { navItem: NavItem }) => (
    <li
      key={navItem.title}
      className={`font-sm mb-4 ${
        activePath?.includes(navItem.url!!) ? "text-border-info" : null
      }`}
    >
      <a className="text-text-default text-sm" href={`${navItem.url}`}>
        {capitalizeFirstLetter(navItem.title)}
      </a>
    </li>
  );

  return (
    <nav className="hidden md:block col-span-2 px-4 border-r-1">
      <ul className="mt-6">
        {navItems?.map((navItem: NavItem) => {
          if (navItem.children) {
            return (
              <>
                <RootElement navItem={navItem} />
                <li key={navItem.title}>
                  <ul>
                    {navItem.children.map((child: NavItem) => (
                      <SubElement key={child.title} navItem={child} />
                    ))}
                  </ul>
                </li>
                <hr className="bg-core-gray-02 mb-4" />
              </>
            );
          }
          return (
            <>
              <RootElement key={navItem.title} navItem={navItem} />
              {navItems.length !== navItems.indexOf(navItem) + 1 && (
                <hr className="bg-core-gray-02 mb-4" />
              )}
            </>
          );
        })}
      </ul>
    </nav>
  );
};
