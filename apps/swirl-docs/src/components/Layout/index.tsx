import { CommandMenu } from "../CommandMenu/CommandPallete";
import DocSearchComponent from "../DocSearch/DocSearch";
import HeaderNavigation from "../HeaderNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderNavigation />
      <CommandMenu />
      {/* <DocSearchComponent /> */}
      {children}
    </>
  );
};

export default Layout;
