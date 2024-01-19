"use client"

import { useGetPosts } from "@/data/get-posts"
import { addLike, deletePost } from "@/server/actions/create-post"
import { useAction } from "next-safe-action/hooks"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { HeartIcon, Trash } from "lucide-react"
import { CardDescription, CardHeader, CardMotion, CardTitle } from "./ui/card"
import { useSession } from "next-auth/react"

export default function Posts() {
  const { data: posts, error: postError, fetchStatus } = useGetPosts()
  const { execute: executeAddLike } = useAction(addLike)
  const { execute: exectueDeletePost } = useAction(deletePost)
  const { data: session } = useSession()
  if (postError) return postError.message
  if (posts?.success)
    return (
      <CardMotion layout className="flex flex-col mt-6 p-4 font-medium">
        <CardHeader>
          <CardTitle>Posts by everyone </CardTitle>
          <CardDescription>
            Currently:{" "}
            <span
              className={cn(
                fetchStatus === "idle" ? "text-orange-400" : "",
                fetchStatus === "fetching" ? "text-green-400" : ""
              )}
            >
              {fetchStatus}
            </span>
          </CardDescription>
        </CardHeader>

        <AnimatePresence presenceAffectsLayout>
          {posts?.success.map((post) => (
            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="mx-6 my-2 p-4 border-2 border-secondary rounded-md "
              key={post.id}
            >
              <p className="text-primary">{post.content}</p>
              <div className="flex gap-2 items-center">
                <Trash
                  onClick={() => exectueDeletePost({ id: post.id })}
                  className="w-4 text-red-400 cursor-pointer "
                />
                <div
                  onClick={() =>
                    executeAddLike({
                      post_id: post.id,
                      user_id: session?.user.id,
                    })
                  }
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <HeartIcon className="w-4 text-secondary-foreground" />
                  <p className="text-sm">{post.likes.length}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardMotion>
    )
}
