import { getAllUsers } from "@/app/service/user/userService";
import CustomContainer from "@/components/common/customContainer";
import { RoleLookup } from "@/lookups/role/roleLookup";
import { UserData } from "@/types/UserData";

import AdminNavbar from "../../navbar";
import { Account, columns } from "./datatable/columns";
import { DataTable } from "./datatable/dataTable";

const AccountList = async () => {
  const allUsers = await getAllUsers();

  // console.log(typeof allUsers.message);

  const accList: Account[] = allUsers!.map((user: UserData) => ({
    fullName: user.fullName,
    emailAddress: user.email,
    mobileNumber: user.phoneNumber,
    role: RoleLookup.find((r) => r.id === user.roleId)!.title,
    status: "active", //TODO: add status in db
  }));

  return (
    <>
      <AdminNavbar title="Administration" showTabs />
      <section className="pt-8">
        <CustomContainer>
          <div>
            <div className="flex items-center gap-4 pb-8">
              <p className="text-lg font-medium">Manage Account</p>
            </div>

            <DataTable columns={columns} data={accList} />
          </div>
        </CustomContainer>
      </section>
    </>
  );
};

export default AccountList;
