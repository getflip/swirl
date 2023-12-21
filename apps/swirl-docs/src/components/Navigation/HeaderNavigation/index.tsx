import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect, useState } from "react";
import { DesktopView, MobileView } from "../../View/Views";

import { SwirlIconClose, SwirlIconMenu } from "@getflip/swirl-components-react";
import { isProdDeployment } from "@swirl/lib/env";
import { navItems } from "@swirl/lib/navigation";
import commandPaletteObserver from "@swirl/lib/search/commandPaletteObserver";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileNav from "../MobileNavigation";
import { OpenSearchDesktopButton } from "./OpenSearchDesktopButton";
import { OpenSearchMobileButton } from "./OpenSearchMobileButton";

export const HeaderLogo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/"
      className="flex justify-center items-center mr-8 max-h-7"
      onClick={onClick}
    >
      <Image
        alt="Swirl home"
        src="/swirl-icon-temp.svg"
        width={28}
        height={28}
        className="max-h-7"
      />
      <span className="font-medium ml-3">Dev</span>
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

  const activePath = router.asPath;

  const handleCloseMenu = () => {
    setIsMobileNavOpen(false);
  };

  function toggleMobile() {
    setIsMobileNavOpen(!isMobileNavOpen);
  }

  function openCommandPalette() {
    commandPaletteObserver.set(true);
  }

  const filteredNavItems = navItems.filter(
    (navItem) => !isProdDeployment || !navItem.devOnly
  );

  return (
    <>
      <Link
        href="#main"
        className="absolute translate-x-[-200px] focus:static focus:translate-x-0"
      >
        Skip Navigation Links
      </Link>
      <DesktopView>
        <header className="bg-background-default z-10 max-h-[72px]">
          <nav
            aria-label="main"
            className="flex justify-between items-center h-[72px] w-full px-4 border-b-1 font-normal text-base"
          >
            <div className="flex ">
              <HeaderLogo />
              <ul className="hidden md:flex flex-row items-center bg-background-default">
                {filteredNavItems.map((link) => {
                  const isActive =
                    activePath.split("/")[1] === link.url?.split("/")[1];

                  return (
                    <li
                      key={link.url}
                      className={classNames(
                        "relative mr-space-24",
                        "hover:text-border-info",
                        "before:block before:absolute before:bottom-[-23px] before:w-full before:h-1 before:bg-border-info",
                        {
                          "before:opacity-100 text-border-info": isActive,
                          "before:opacity-0": !isActive,
                        }
                      )}
                    >
                      {link.url ? (
                        <Link
                          className={classNames("text-text-default text-base", {
                            "text-text-highlight": isActive,
                          })}
                          href={link.url}
                        >
                          {link.title}
                        </Link>
                      ) : (
                        link.title
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <OpenSearchDesktopButton />
          </nav>
        </header>
      </DesktopView>
      <MobileView>
        <header
          aria-expanded={isMobileNavOpen}
          aria-label="main"
          className="sticky top-0 z-10 flex justify-between items-center px-4 border-b-1 font-normal text-base w-full h-16 max-h-screen bg-background-default"
        >
          <div className="flex justify-between items-center h-16 w-full border-b-1 font-normal text-base">
            <HeaderLogo onClick={() => setIsMobileNavOpen(false)} />
            <div className="flex items-center">
              <OpenSearchMobileButton />
              <button
                type="button"
                className="inline-flex items-center"
                aria-controls="mobile-navigation"
                aria-label={isMobileNavOpen ? "close menu" : "open menu"}
                onClick={toggleMobile}
              >
                {isMobileNavOpen ? (
                  <SwirlIconClose size={24} />
                ) : (
                  <SwirlIconMenu size={24} />
                )}
              </button>
            </div>
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
