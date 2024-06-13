import CustomContainer from "@/components/common/customContainer";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";

import TournamentDashboardNavbar from "./navbar";
import TournamentDashboardSwitcher from "./switcher";

const TournamentDashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <CustomContainer className="max-w-[1000px]">
      <div className="flex gap-4">
        <TournamentDashboardSwitcher />
        <TournamentDashboardNavbar id={params.id} />
      </div>

      <Separator className="my-4 py-[1px]" />
      <div>{children}</div>
    </CustomContainer>
  );
};

export default TournamentDashboardLayout;
