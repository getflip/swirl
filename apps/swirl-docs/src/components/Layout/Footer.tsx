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
    <>
      <PreFooter />
      <footer className="hidden md:flex sticky bottom-0 col-span-12 bg-white justify-between items-center h-20 px-4 w-full">
        <Image alt="Flip Logo" src="/flip-logo.svg" width={70} height={30} />
        <ul className="flex justify-center items-center">
          {links.map((link) => (
            <li key={link.path} className="mr-8">
              <a href={link.path}>{link.name}</a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
};

export default Footer;
