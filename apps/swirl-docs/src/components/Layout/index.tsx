import { CommandPalette } from "../CommandMenu/CommandPalette";
import HeaderNavigation from "../HeaderNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <CommandPalette />
      <HeaderNavigation />
      {children}
    </>
  );
};

export default Layout;
