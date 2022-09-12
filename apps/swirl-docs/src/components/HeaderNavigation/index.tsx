const links: {
  name: string;
  href: string;
}[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Foundations",
    href: "foundations",
  },
  {
    name: "Components",
    href: "components",
  },
  {
    name: "Tokens",
    href: "tokens",
  },
  {
    name: "Icons",
    href: "icons",
  },
];

const HeaderNavigation = () => {
  return (
    <nav className="flex justify-center items-center h-16 w-screen">
      <ul className="flex flex-row">
        {links.map((link) => (
          <li key={link.href} className="mr-4">
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
