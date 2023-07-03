import { NavLink } from "@swirl/lib/navigation";
import Image from "next/image";
import Link from "next/link";
import PreFooter from "./PreFooter";

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
    <footer className="max-w-[90rem] w-full mx-auto" id="footer">
      {/* <PreFooter /> */}
      <nav
        aria-label="footer"
        className="hidden md:flex bottom-0 col-start-3 col-span-10 bg-white justify-between items-center h-20 px-4 w-full"
      >
        <Image alt="Flip Logo" src="/flip-logo.svg" width={70} height={30} />
        <ul className="flex justify-center items-center">
          {links.map((link, index) => (
            <li key={link.path + `-${index}`} className="mr-8">
              <Link href={link.path}>
                <a className="text-sm text-text-default">{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
