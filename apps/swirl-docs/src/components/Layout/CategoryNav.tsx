import { FunctionComponent, useEffect, useState } from "react";
import { DocCategory } from "@swirl/lib/docs/src/docs.model";

type CategoryNavProps = {
  categoryLinkList: DocCategory[] | undefined;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const CategoryNav: FunctionComponent<CategoryNavProps> = ({
  categoryLinkList,
}) => {
  const [activePath, setActivePath] = useState<string | null>(null);
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <nav className="hidden md:block col-span-2 px-4 border-r-1">
      <ul className="mt-6">
        {categoryLinkList?.map((category: DocCategory) => {
          return (
            <li
              key={category.name}
              className={`font-sm mb-4 ${
                activePath?.includes(category.path) ? "text-blue-600" : null
              }`}
            >
              <a href={`${category.path}`}>
                {capitalizeFirstLetter(category.name)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
