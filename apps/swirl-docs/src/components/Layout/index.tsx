import { NavLink } from "@swirl/lib/navigation";
import HeaderNavigation from "../HeaderNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const links: NavLink[] = [
    // {
    //   name: "Foundations",
    //   path: "/foundations",
    // },
    // {
    //   name: "Components",
    //   path: "/components",
    // },
    {
      name: "Tokens",
      path: "/tokens",
    },
    {
      name: "Icons",
      path: "/icons",
    },
  ];
  return (
    <>
      <HeaderNavigation links={links} />
      {children}
    </>
  );
};

export default Layout;
