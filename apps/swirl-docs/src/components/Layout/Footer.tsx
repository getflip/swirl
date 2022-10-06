import { Link } from "@swirl/lib/navigation";
import Image from "next/image";
import PreFooter from "./PreFooter";

const links: Link[] = [
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
    <footer id="footer">
      <PreFooter />
      <div className="hidden md:flex bottom-0 col-start-3 col-span-10 bg-white justify-between items-center h-20 px-4 w-full">
        <Image alt="Flip Logo" src="/flip-logo.svg" width={70} height={30} />
        <ul className="flex justify-center items-center">
          {links.map((link, index) => (
            <li key={link.path + `-${index}`} className="mr-8">
              <a className="text-sm text-text-default" href={link.path}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
