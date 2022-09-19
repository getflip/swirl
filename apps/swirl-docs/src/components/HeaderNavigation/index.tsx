import { Link } from "@swirl/lib/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const links: Link[] = [
  {
    name: "Foundations",
    path: "/foundations",
  },
  {
    name: "Components",
    path: "/components",
  },
  {
    name: "Tokens",
    path: "/tokens",
  },
  {
    name: "Icons",
    path: "/icons",
  },
];

const HeaderNavigation = () => {
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <nav className="flex justify-start items-center h-[72px] w-screen px-6 border-b-1 font-semibold">
      <a href="/" className="flex justify-center items-center mr-8">
        <Image
          alt="Flip Logo"
          src="/swirl-icon-temp.svg"
          width={32}
          height={32}
        />
        <span className="font-bold ml-3">Swirl</span>
      </a>
      <ul className="flex flex-row">
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
              before:bg-blue-500
              ${
                activePath?.includes(link.path)
                  ? "before:opacity-100"
                  : "before:opacity-0"
              }`}
          >
            <a href={link.path}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
