import ProfileNavbar from "../profileNavbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileNavbar title="Profile" showTabs />
      {children}
    </>
  );
};

export default Layout;
