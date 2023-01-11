import Image from "next/image";
import { useState } from "react";
import icon from "@getflip/swirl-icons/icons/Close16.svg";
import MobileNav from "./mobileNav";
import Link from "next/link";
import { navItems } from "@swirl/lib/navigation";
import { useRouter } from "next/router";
import { Autocomplete } from "../Search/AutoComplete";

const HeaderNavigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const router = useRouter();

  const links = navItems.slice(1, navItems.length);
  const activePath = router.pathname;

  const handleCloseMenu = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header>
      <Link tabIndex={1} href="#main">
        <a className="absolute translate-x-[-200px] focus:static focus:translate-x-0">
          Skip Navigation Links
        </a>
      </Link>
      <nav
        aria-label="main"
        className="flex justify-between items-center h-[72px] w-full px-6 border-b-1 font-normal text-base"
      >
        <div className="inline-flex w-full justify-between md:justify-start">
          <Link href="/">
            <a className="flex justify-center items-center mr-8">
              <Image
                alt="Swirl home"
                src="/swirl-icon-temp.svg"
                width={32}
                height={32}
              />
              <span className="font-bold ml-3">Swirl</span>
            </a>
          </Link>

          <div className="inline-flex md:hidden">
            {isMobileNavOpen && (
              <button type="button" onClick={() => setIsMobileNavOpen(false)}>
                <Image alt="Close Menu" src={icon.src} width={24} height={24} />
              </button>
            )}
            {!isMobileNavOpen && (
              <button
                type="button"
                aria-label="open menu"
                onClick={() => setIsMobileNavOpen(true)}
              >
                <div className="w-6 bg-gray-300 h-1 mb-1 rounded-full"></div>
                <div className="w-6 bg-gray-300 h-1 mb-1 rounded-full"></div>
                <div className="w-6 bg-gray-300 h-1 mb-1 rounded-full"></div>
              </button>
            )}
          </div>

          <ul className="hidden md:flex flex-row">
            {links.map((link) => (
              <li
                key={link.url}
                className={`
              relative
              mr-4
              before:block before:absolute
              before:bottom-[-23px]
              before:w-full
              before:h-1
              before:bg-border-info
              ${
                activePath?.includes(link.url)
                  ? "before:opacity-100"
                  : "before:opacity-0"
              }`}
              >
                <Link
                  className={`text-text-default text-base ${
                    activePath?.includes(link.url) ? "text-border-info" : ""
                  }`}
                  href={link.url}
                >
                  <a>{link.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Autocomplete
          placeholder="Search"
          openOnFocus={true}
          defaultActiveItemId={0}
        />
      </nav>
      {isMobileNavOpen && <MobileNav handleCloseMenu={handleCloseMenu} />}
    </header>
  );
};

export default HeaderNavigation;
