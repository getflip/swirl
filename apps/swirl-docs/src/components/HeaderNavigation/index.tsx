import { Link } from "@swirl/lib/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import icon from "@getflip/swirl-icons/icons/Close16.svg";
import MobileNav from "./mobileNav";

export type HeaderNavigationProps = {
  links: Link[];
};

const HeaderNavigation = ({ links }: HeaderNavigationProps) => {
  const [activePath, setActivePath] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const handleCloseMenu = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between md:justify-start items-center h-[72px] w-full px-6 border-b-1 font-normal text-base">
        <a href="/" className="flex justify-center items-center mr-8">
          <Image
            alt="Flip Logo"
            src="/swirl-icon-temp.svg"
            width={32}
            height={32}
          />
          <span className="font-bold ml-3">
            {activePath?.includes("/tokens") || activePath?.includes("/icons")
              ? "Swirl"
              : "Dev"}
          </span>
        </a>

        <div className="block md:hidden">
          {isMobileNavOpen && (
            <button onClick={() => setIsMobileNavOpen(false)}>
              <Image alt="Close Icon" src={icon.src} width={24} height={24} />
            </button>
          )}
          {!isMobileNavOpen && (
            <button onClick={() => setIsMobileNavOpen(true)}>
              <div className="w-6 bg-gray-300 h-1 mb-1 rounded-full"></div>
              <div className="w-6 bg-gray-300 h-1 mb-1 rounded-full"></div>
              <div className="w-6 bg-gray-300 h-1 mb-1 rounded-full"></div>
            </button>
          )}
        </div>

        <ul className="hidden md:flex flex-row">
          {links.map((link) => (
            <li
              key={link.path}
              className={`
              relative
              mr-4
              before:block before:absolute
              before:bottom-[-23px]
              before:w-full
              before:h-1
              before:bg-border-info
              ${
                activePath?.includes(link.path)
                  ? "before:opacity-100"
                  : "before:opacity-0"
              }`}
            >
              <a
                className={`text-text-default text-base ${
                  activePath?.includes(link.path) ? "text-border-info" : ""
                }`}
                href={link.path}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {isMobileNavOpen && <MobileNav handleCloseMenu={handleCloseMenu} />}
    </>
  );
};

export default HeaderNavigation;
