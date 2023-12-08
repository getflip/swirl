import { NavItem } from "@swirl/lib/navigation";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import ListItemStrategy from "./ListItemStrategy";
import Image from "next/image";
import icon from "@getflip/swirl-icons/icons/ChevronRight28.svg";

function ChevronButton({
  isExpanded,
  toggle,
  ariaId,
  title,
  isNestedNavGroup,
}: {
  isExpanded: boolean;
  toggle: () => void;
  ariaId?: number;
  title: string;
  isNestedNavGroup?: boolean;
}) {
  return (
    <button
      id={`accordion-${ariaId}`}
      type="button"
      aria-expanded={isExpanded}
      aria-controls={`accordion-panel-${ariaId}`}
      onClick={toggle}
      className={classNames(
        "flex justify-between py-2 w-full text-base font-normal",
        isNestedNavGroup ? "pl-10 pr-4" : "px-4"
      )}
    >
      <span>{title}</span>
      <Image
        alt=""
        className={isExpanded ? "rotate-90" : ""}
        src={icon.src}
        width={24}
        height={24}
      />
    </button>
  );
}

export interface ListItemProps {
  ariaId?: number;
  item: NavItem;
  currentPath: string;
  hasParent?: boolean;
  handleCloseMenu: () => void;
}

export function TopLevelNavLink({
  item: { title, url },
  currentPath,
  handleCloseMenu,
}: ListItemProps) {
  return (
    <li>
      <Link
        href={url}
        passHref
        aria-current={url === currentPath ? "page" : "false"}
        onClick={handleCloseMenu}
        className="flex justify-between py-3 font-normal px-4 w-full text-base capitalize"
      >
        {title}
      </Link>
    </li>
  );
}

export function ExpandableNavGroup({
  currentPath,
  item: { title, children },
  ariaId,
  handleCloseMenu,
}: ListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li>
      <ChevronButton
        isExpanded={isExpanded}
        toggle={() => setIsExpanded((prevState) => !prevState)}
        ariaId={ariaId}
        title={title}
      />

      <ul
        id={`accordion-panel-${ariaId}`}
        aria-labelledby={`accordion-${ariaId}`}
        className={classNames({
          block: isExpanded,
          hidden: !isExpanded,
        })}
      >
        {children?.map((child) => (
          <ListItemStrategy
            hasParent
            key={child.url}
            item={child}
            currentPath={currentPath}
            handleCloseMenu={handleCloseMenu}
          />
        ))}
      </ul>
    </li>
  );
}

export function NestedNavGroup({
  ariaId,
  item: { title, children },
  currentPath,
  handleCloseMenu,
}: ListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li>
      <>
        <ChevronButton
          isNestedNavGroup
          isExpanded={isExpanded}
          toggle={() => setIsExpanded((prevState) => !prevState)}
          ariaId={ariaId}
          title={title}
        />

        <ul
          id={`accordion-panel-${ariaId}`}
          aria-labelledby={`accordion-${ariaId}`}
          className={classNames({
            block: isExpanded,
            hidden: !isExpanded,
          })}
        >
          {children?.map((child) => (
            <ListItemStrategy
              hasParent
              key={child.url}
              item={child}
              currentPath={currentPath}
              handleCloseMenu={handleCloseMenu}
            />
          ))}
        </ul>
      </>
    </li>
  );
}

export function NestedNavLink({
  item: { title, url },
  currentPath,
  handleCloseMenu,
}: ListItemProps) {
  return (
    <li>
      <Link
        href={url}
        passHref
        aria-current={url === currentPath ? "page" : "false"}
        onClick={() => {
          handleCloseMenu();
        }}
        className="flex justify-between py-2 px-10 w-full capitalize"
      >
        {title}
      </Link>
    </li>
  );
}
