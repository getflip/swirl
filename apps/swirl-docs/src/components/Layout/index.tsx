import HeaderNavigation from "../HeaderNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderNavigation />
      {children}
    </>
  );
};

export default Layout;
