"use client";

import CustomContainer from "@/components/common/customContainer";

import { Account, columns } from "./datatable/columns";
import { DataTable } from "./datatable/dataTable";

interface props {
  data: Account[];
}

const AccountList = ({ data }: props) => {
  return (
    <section className="pt-8">
      <CustomContainer>
        <div>
          <div className="flex items-center gap-4 pb-8">
            <p className="text-lg font-medium">Manage Account</p>
          </div>

          <DataTable columns={columns} data={data} />
        </div>
      </CustomContainer>
    </section>
  );
};

export default AccountList;
