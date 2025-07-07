import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { tournamentService } from "@/app/(main)/tournament/services/tournament.api";
import { ITournamentRules } from "@/app/(main)/tournament/components/TournamentRulesAndMatchSettingsWrapper";

export function useTournamentRules(id: number) {
  return useQuery({
    queryKey: queryKeys.tournamentRules.detail(id),
    queryFn: () => tournamentService.getTournamentRulesAndMatchSettings(id),
    enabled: Number.isFinite(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateTournamentRules(){
  const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: ITournamentRules }) => {
        // console.log("updateTournament queryId: ", id, typeof id);

        return tournamentService.updateTournamentRulesAndMatchSettings(id, data);
      },
      onSuccess: (updatedTournament, { id }) => {
        toast.success(`Tournament ${id} updated successfully! 🎉`);

        // Update specific tournament in cache
        queryClient.setQueryData(
          queryKeys.tournamentRules.detail(id),
          updatedTournament
        );

        // Invalidate tournaments list to reflect changes
        // queryClient.invalidateQueries({ queryKey: queryKeys.tournamentRules.lists() });
      },
      onError: (error) => {
        toast.error(`Failed to update tournament: ${error.message}`);
      },
    });
}
