import CustomContainer from "@/components/common/customContainer";

import AdminNavbar from "../../navbar";
import CreateAccountForm from "./form";

const CreateAccount = () => {
  return (
    <>
      <AdminNavbar title="Create Account" showTabs={false} />
      <section className="pt-8">
        <CustomContainer>
          <CreateAccountForm />
        </CustomContainer>
      </section>
    </>
  );
};

export default CreateAccount;
