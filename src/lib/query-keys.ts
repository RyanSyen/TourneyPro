/*
TanStack Query manages query caching for you based on query keys
We need to define every query key to be unique and descriptive to our query
Its common to pass id, index or even an object as part of the query key
This helps TanStack Query to identify the query and cache it properly
Adding the keys in our query will ensure that the queries are cached independently and when a variable change,
the query will be refetched

https://tkdodo.eu/blog/effective-react-query-keys
*/

// follow prisma schema for query keys
export const queryKeys = {
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.users.lists(), { filters }] as const,
    // list: (filters: {status?: string; page?: number; limit?: number}) => [...todoKeys.lists(), filters] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  tournament: {
    all: ["tournaments"] as const,
    lists: () => [...queryKeys.tournament.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.tournament.lists(), { filters }] as const,
    details: () => [...queryKeys.tournament.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.tournament.details(), id] as const,
  },
  tournamentRules: {
    all: ["tournament-rules"] as const,
    details: () => [...queryKeys.tournamentRules.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.tournamentRules.details(), id] as const,
  }
};
