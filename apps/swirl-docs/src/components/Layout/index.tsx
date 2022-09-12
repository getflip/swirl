import HeaderNavigation from "../HeaderNavigation";

const Layout = (props: any) => {
  return (
    <>
      <HeaderNavigation />
      {props.children}
    </>
  );
};

export default Layout;
