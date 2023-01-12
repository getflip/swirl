import Image from "next/image";
import icon from "@getflip/swirl-icons/icons/Close16.svg";
import MobileNav from "./mobileNav";
import Link from "next/link";
import { navItems } from "@swirl/lib/navigation";
import { useRouter } from "next/router";
import { DesktopView, MobileView } from "../View/Views";
import { useEffect, useState } from "react";
import { Autocomplete } from "../Search/AutoComplete";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import classNames from "classnames";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <a className="flex justify-center items-center mr-8">
        <Image
          alt="Swirl home"
          src="/swirl-icon-temp.svg"
          width={32}
          height={32}
        />
        <span className="font-medium ml-3">Swirl</span>
      </a>
    </Link>
  );
};

const HeaderNavigation = () => {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window) {
      if (isMobileNavOpen) {
        disableBodyScroll(document.getElementById("mobile-navigation")!);
      } else {
        enableBodyScroll(document.getElementById("mobile-navigation")!);
      }
    }
  }, [isMobileNavOpen]);

  const links = navItems.slice(1, navItems.length);
  const activePath = router.pathname;

  const handleCloseMenu = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <>
      <Link tabIndex={1} href="#main">
        <a className="absolute translate-x-[-200px] focus:static focus:translate-x-0">
          Skip Navigation Links
        </a>
      </Link>
      <DesktopView>
        <header className="sticky top-0 bg-background-default z-10">
          <nav
            aria-label="main"
            className="flex justify-between items-center h-[72px] w-full px-4 border-b-1 font-normal text-base"
          >
            <div className="flex ">
              <HeaderLogo />
              <ul className="hidden md:flex flex-row bg-background-default">
                {links.map((link) => (
                  <li
                    key={link.url}
                    className={classNames(
                      "relative mr-4",
                      "before:block before:absolute before:bottom-[-23px] before:w-full before:h-1 before:bg-border-info",
                      {
                        "before:opacity-100": activePath?.includes(link.url),
                        "before:opacity-0": !activePath?.includes(link.url),
                      }
                    )}
                  >
                    <Link
                      className={classNames("text-text-default text-base", {
                        "text-border-info": activePath?.includes(link.url),
                      })}
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
        </header>
      </DesktopView>
      <MobileView>
        <header
          aria-expanded={isMobileNavOpen}
          aria-label="main"
          className="sticky top-0 z-10 flex justify-between items-center px-4 border-b-1 font-normal text-base w-full h-16 max-h-screen bg-background-default"
        >
          <div className="flex justify-between items-center h-16 w-full px-4 border-b-1 font-normal text-base">
            <HeaderLogo />
            {isMobileNavOpen ? (
              <button
                aria-controls="mobile-navigation"
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Image alt="Close Menu" src={icon.src} width={24} height={24} />
              </button>
            ) : (
              <button
                aria-controls="mobile-navigation"
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
          <MobileNav
            isOpen={isMobileNavOpen}
            handleCloseMenu={handleCloseMenu}
          />
        </header>
      </MobileView>
    </>
  );
};

export default HeaderNavigation;
