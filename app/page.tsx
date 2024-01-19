import PostForm from "@/components/post-form"
import Posts from "@/components/posts"
import { fetchPosts } from "@/server/actions/create-post"
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostForm />
        <Posts />
      </HydrationBoundary>
    </main>
  )
}
