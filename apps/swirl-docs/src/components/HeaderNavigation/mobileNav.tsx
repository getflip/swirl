import Image from "next/image";
import { NavItem, navItems } from "@swirl/lib/navigation";
import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";
import Link from "next/link";
import { useState } from "react";
import classNames from "classnames";
import { OpenSearchButton } from "./OpenSearchButton";

interface MobileNavProps {
  isOpen: boolean;
  handleCloseMenu?: () => void;
}

const MobileNav = ({ isOpen, handleCloseMenu }: MobileNavProps) => {
  return (
    <nav
      id="mobile-navigation"
      aria-label="main"
      className={classNames("overflow-y-scroll bg-white", {
        "absolute w-full left-0 top-[64px] pt-4": isOpen,
      })}
    >
      <div
        className={classNames(
          "w-full pb-2 px-4",
          { block: isOpen },
          { hidden: !isOpen }
        )}
      >
        <OpenSearchButton />
      </div>
      <ul
        className={classNames(
          "z-40 w-full h-[calc(100vh_-_64px)] max-h-[calc(100vh_-_64px)] bg-white",
          { block: isOpen },
          { hidden: !isOpen }
        )}
      >
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
    </nav>
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
            className="flex justify-between py-2 px-4 w-full text-base font-normal"
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
            className={classNames({
              block: isExpanded,
              hidden: !isExpanded,
            })}
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
            className="flex justify-between py-3 font-normal px-4 w-full text-base capitalize"
          >
            {item.title}
          </a>
        </Link>
      )}

      {!item.children && !item.isRoot && item.url && (
        <Link href={item.url} passHref>
          <a
            aria-current={item.url === currentPath ? "page" : "false"}
            onClick={handleCloseMenu}
            className="flex justify-between py-2 px-10 w-full capitalize"
          >
            {item.title}
          </a>
        </Link>
      )}
    </li>
  );
}

export default MobileNav;
