import { BetaBreadcrumb, IBreadcrumb } from "@/components/common/breadcrumb";

const TournamentBreadcrumbList: IBreadcrumb[] = [
  {
    segment: "tournament",
    label: "Tournament Builder",
    url: "/tournament/list",
  },
  {
    segment: "create",
    label: "Create Tournament",
  },
  {
    segment: "dashboard",
    label: "Dashboard",
  },
];

const TournamentBuilderLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main>
      <BetaBreadcrumb breadcrumbList={TournamentBreadcrumbList} />
      {children}
    </main>
  );
};

export default TournamentBuilderLayout;
