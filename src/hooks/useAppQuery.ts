import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export function useAppQuery<TData, TError = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key: any[],
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>
) {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn,
    ...options,
  })
}
