import CustomContainer from "@/components/common/customContainer";

import AdminNavbar from "./adminNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <section className="pt-8">
        <CustomContainer>{children}</CustomContainer>
      </section> */}
      {children}
    </>
  );
};

export default AdminLayout;
