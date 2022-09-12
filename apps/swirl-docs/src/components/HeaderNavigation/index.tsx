import { Link } from "@swirl/lib/navigation";

const links: Link[] = [
  {
    name: "Home",
    path: "/",
  },
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
  return (
    <nav className="flex justify-center items-center h-16 w-screen">
      <ul className="flex flex-row">
        {links.map((link) => (
          <li key={link.path} className="mr-4">
            <a href={link.path}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
