import { fetchUsers } from '../services/users'
import { type User } from '../types.d'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor: number, users: User[] }>({
      queryKey: ['users'],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return { 
    isLoading, 
    isError, 
    data, 
    refetch, 
    fetchNextPage, 
    hasNextPage,
    users: data?.pages?.flatMap(page => page.users) ?? []
  }
}