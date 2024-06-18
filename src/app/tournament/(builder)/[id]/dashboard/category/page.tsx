import { getCategoryByTournamentId } from "@/app/service/tournament/categoryService";

import TournamentCategory from "./category";

const TournamentCategoryPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const categories = await getCategoryByTournamentId(params.id);

  return (
    <TournamentCategory
      tournamentId={params.id}
      categories={categories.message}
    />
  );
};

export default TournamentCategoryPage;
