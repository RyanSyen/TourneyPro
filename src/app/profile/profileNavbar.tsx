import Tab from "@/components/common/tab";
import { ProfileTabLookup as tabList } from "@/lookups/profile/ProfileTabLookup";

interface props {
  title: string;
  showTabs: boolean;
}

const ProfileNavbar = (props: props) => {
  return (
    <div className="flex flex-col gap-8">
      {/* {!props.showTabs && <AdminBreadcrumb />} */}
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight border-l-4 border-[#e50b0d] px-4">
        {props.title}
      </h3>
      {props.showTabs && <ProfileTab />}
    </div>
  );
};

const ProfileTab = () => {
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

export default ProfileNavbar;
