import { getAllUsers } from "@/app/service/user/userService";
import CustomContainer from "@/components/common/customContainer";
import { RoleLookup } from "@/lookups/role/roleLookup";
import { UserData } from "@/types/UserData";

import AdminNavbar from "../../navbar";
import AccountList from "./accountList";
import { Account, columns } from "./datatable/columns";
import { DataTable } from "./datatable/dataTable";

const AccountListing = async () => {
  const { message, success } = await getAllUsers();
  let accList: Account[] | [] = [];

  // console.log("all users: ", allUsers);

  if (success && message && message.length > 0) {
    accList = message.map((user: UserData) => ({
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
