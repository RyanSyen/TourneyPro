import { ChevronRightIcon } from "@radix-ui/react-icons";

import Breadcrumb from "@/components/common/breadcrumb";
import Tab from "@/components/common/tab";
import CustomLink from "@/components/ui/link";
import { AdminTabLookup as tabList } from "@/lookups/admin/adminLookup";

import AdminBreadcrumb from "./breadcrumb";

interface props {
  title: string;
  showTabs: boolean;
}

const AdminNavbar = (props: props) => {
  return (
    <div className="flex flex-col gap-8">
      {!props.showTabs && <AdminBreadcrumb />}
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight border-l-4 border-[#e50b0d] px-4">
        {props.title}
      </h3>
      {props.showTabs && <AdminTab />}

      {/* carousel implementation */}
      {/* <div className="flex flex-col justify-center items-center">
        <TabCarousel list={AdminTabLookup} />
      </div> */}
    </div>
  );
};

const AdminTab = () => {
  return (
    <div className="flex flex-wrap justify-start items-center gap-4">
      {tabList.map((tab, index) => {
        return (
          <Tab
            key={index}
            name={tab.name}
            url={tab.url}
            isCurrent={tab.url.includes("/admin/account")}
          />
        );
      })}
    </div>
  );
};

export default AdminNavbar;
