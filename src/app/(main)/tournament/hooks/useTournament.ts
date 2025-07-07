// Custom hooks shared *only within* the tournament feature
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { tournamentService } from "../services/tournament.api";
import { CreateOrUpdateTournamentDto } from "../types/tournament.dto";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppQuery } from "@/hooks/useAppQuery";
import { ITournament } from "@/app/(main)/tournament/types/tournament.types";

// Query hooks
export function useTournaments(params?: string) {
  return useAppQuery(Array.from(queryKeys.tournament.list(params || "")), () =>
    tournamentService.getTournaments(params)
  );
}

export function useTournament(id: number) {
  // console.log("queryKey:", queryKeys.tournament.detail(id));
  // console.log("queryId: ", id);
  // console.log("queryId: ", id, typeof id);

  return useQuery({
    queryKey: queryKeys.tournament.detail(id),
    queryFn: () => tournamentService.getTournament(id),
    enabled: Number.isFinite(id),
    staleTime: 1000 * 60 * 5,
  });
}

// Mutation hooks
export function useCreateTournament() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateOrUpdateTournamentDto) =>
      tournamentService.createTournament(data),
    onSuccess: (newTournament) => {
      toast.success("Tournament created successfully! 🎉");

      // Invalidate tournaments list
      queryClient.invalidateQueries({ queryKey: queryKeys.tournament.lists() });

      // Optimistically update the cache
      queryClient.setQueryData(
        queryKeys.tournament.detail(newTournament.id!),
        newTournament
      );

      router.push("/tournament/list");
    },
    onError: (error) => {
      toast.error(`Failed to create tournament: ${error.message}`);
    },
  });
}

export function useUpdateTournament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITournament }) => {
      console.log("updateTournament queryId: ", id, typeof id);

      return tournamentService.updateTournament(id, data);
    },
    onSuccess: (updatedTournament, { id }) => {
      toast.success(`Tournament ${id} updated successfully! 🎉`);

      // Update specific tournament in cache
      queryClient.setQueryData(
        queryKeys.tournament.detail(id),
        updatedTournament
      );

      // Invalidate tournaments list to reflect changes
      queryClient.invalidateQueries({ queryKey: queryKeys.tournament.lists() });
    },
    onError: (error) => {
      toast.error(`Failed to update tournament: ${error.message}`);
    },
  });
}

export function useDeleteTournament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tournamentService.deleteTournament(id),
    onSuccess: (_, deletedId) => {
      toast.success(`Tournament ${deletedId} deleted successfully! 🎉`);

      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.tournament.detail(deletedId),
      });

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.tournament.lists() });
    },
    onError: (error) => {
      toast.error(`Failed to delete tournament: ${error.message}`);
    },
  });
}
