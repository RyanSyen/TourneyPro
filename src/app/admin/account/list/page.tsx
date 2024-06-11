import { getAllUsers } from "@/app/service/user/userService";
import CustomContainer from "@/components/common/customContainer";
import { RoleLookup } from "@/lookups/role/roleLookup";
import { UserData } from "@/types/UserData";

import AdminNavbar from "../../adminNavbar";
import AccountList from "./accountList";
import { Account, columns } from "./datatable/columns";
import { DataTable } from "./datatable/dataTable";

const AccountListing = async () => {
  const res = await getAllUsers();
  let accList: Account[] | [] = [];

  console.log("res: ", res);

  if (res.success && res.message && res.message.length > 0) {
    accList = res.message.map((user: UserData) => ({
      fullName: user.fullName,
      emailAddress: user.email,
      mobileNumber: user.phoneNumber,
      role: RoleLookup.find((r) => r.id === user.roleId)!.title,
      status: "active", //TODO: add status in db
    }));
  }

  return (
    <>
      <AdminNavbar title="Administration" showTabs />
      <AccountList data={accList} />
    </>
  );
};

export default AccountListing;
