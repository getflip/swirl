import { NavLink } from "@swirl/lib/navigation";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

const links: NavLink[] = [
  {
    name: "About Flip",
    path: "",
  },
  {
    name: "Partners",
    path: "",
  },
  {
    name: "Careers",
    path: "",
  },
  {
    name: "Press and Media",
    path: "",
  },
];

const Footer = () => {
  return (
    <footer id="footer" className="w-full mt-4 md:mt-0">
      {/* <PreFooter /> */}
      <nav
        aria-label="footer"
        className={classNames(
          "flex flex-col md:flex-row justify-between items-center",
          "w-full bottom-0 bg-white h-full md:h-20 md:max-h-20 px-4"
        )}
      >
        <span className="mb-6 md:mb-0">
          <Image alt="Flip Logo" src="/flip-logo.svg" width={70} height={30} />
        </span>
        <ul className="flex flex-col md:flex-row justify-center items-center">
          {links.map((link, index) => (
            <li key={link.path + `-${index}`} className="mb-4 md:mb-0 md:mr-8">
              <Link href={link.path}>
                <a className="text-font-size-base md:text-font-size-sm leading-6 text-text-default">
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
