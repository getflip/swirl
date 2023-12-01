import { DesktopView, MobileView } from "../View/Views";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./Mobile";
import { OpenSearchButton } from "./OpenSearchButton";
import { SwirlIconClose } from "@getflip/swirl-components-react";
import classNames from "classnames";
import { navItems } from "@swirl/lib/navigation";
import { useRouter } from "next/router";

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
        <span className="font-medium ml-3">Dev</span>
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

  const activePath = router.pathname;

  const handleCloseMenu = () => {
    console.log("handleCloseMenu");
    setIsMobileNavOpen(false);
  };

  function toggleMobile() {
    setIsMobileNavOpen(!isMobileNavOpen);
  }

  const filteredNavItems = navItems.filter((navItem) => {
    if (process.env.NEXT_PUBLIC_DEPLOYMENT_STAGE === "production") {
      return !navItem.title.includes("APIs and References");
    }

    return navItem;
  });

  return (
    <>
      <Link tabIndex={1} href="#main">
        <a className="absolute translate-x-[-200px] focus:static focus:translate-x-0">
          Skip Navigation Links
        </a>
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
                    activePath.split("/")[1] === link.url.split("/")[1];

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
                      <Link
                        className={classNames("text-text-default text-base", {
                          "text-text-highlight": isActive,
                        })}
                        href={link.url}
                      >
                        <a>{link.title}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <OpenSearchButton />
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
            <HeaderLogo />
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
                <i
                  className={`swirl-icons-Menu28 text-icon-strong text-2xl`}
                ></i>
              )}
            </button>
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
