import { fetchPosts } from "@/server/actions/create-post"
import { useQuery } from "@tanstack/react-query"

export function useGetPosts() {
  return useQuery({
    queryFn: async () => fetchPosts(),
    queryKey: ["posts"],
  })
}
