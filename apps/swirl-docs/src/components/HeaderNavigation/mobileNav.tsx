import Image from "next/image";
import { NavItem, navItems } from "@swirl/lib/navigation";
import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
  handleCloseMenu?: () => void;
}

const MobileNav = ({ handleCloseMenu }: MobileNavProps) => {
  return (
    <ul className="absolute z-40 h-full w-full min-h-fit bg-white">
      {navItems.map((navItem: NavItem, index: number) => (
        <ListItem
          key={`${navItem}-${index}`}
          currentPath="/"
          item={navItem}
          ariaId={index}
          handleCloseMenu={handleCloseMenu}
        />
      ))}
    </ul>
  );
};

interface ListItemProps {
  ariaId?: number;
  item: NavItem;
  currentPath: string;
  handleCloseMenu?: () => void;
}

function ListItem({
  ariaId,
  item,
  currentPath,
  handleCloseMenu,
}: ListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li>
      {item.children && (
        <>
          <button
            id={`accordion-${ariaId}`}
            type="button"
            aria-expanded={isExpanded}
            aria-controls={`accordion-panel-${ariaId}`}
            onClick={() => setIsExpanded((prevState) => !prevState)}
            className="flex justify-between py-3 px-2 w-full text-base font-normal"
          >
            <span>{item.title}</span>
            <Image
              alt=""
              className={isExpanded ? "rotate-90" : ""}
              src={icon.src}
              width={24}
              height={24}
            />
          </button>

          <ul
            id={`accordion-panel-${ariaId}`}
            aria-labelledby={`accordion-${ariaId}`}
            className={`${isExpanded ? "block" : "hidden"} `}
          >
            {item.children.map((child) => (
              <ListItem
                key={child.url}
                item={child}
                currentPath={currentPath}
                handleCloseMenu={handleCloseMenu}
              />
            ))}
          </ul>
        </>
      )}

      {item.isRoot && !item.children && item.url && (
        <Link href={item.url} passHref>
          <a
            aria-current={item.url === currentPath ? "page" : "false"}
            onClick={handleCloseMenu}
            className="flex justify-between py-3 px-2 w-full"
          >
            <h3>{item.title}</h3>
          </a>
        </Link>
      )}

      {!item.children && !item.isRoot && item.url && (
        <Link href={item.url} passHref>
          <a
            aria-current={item.url === currentPath ? "page" : "false"}
            onClick={handleCloseMenu}
            className="flex justify-between py-2 px-10 w-full"
          >
            {item.title}
          </a>
        </Link>
      )}
    </li>
  );
}

export default MobileNav;
