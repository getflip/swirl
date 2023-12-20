import { CommandPalette } from "../CommandMenu/CommandPalette";
import HeaderNavigation from "../Navigation/HeaderNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <CommandPalette />
      <HeaderNavigation />
      {children}
    </div>
  );
};

export default Layout;
