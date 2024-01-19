"use server"

import { db } from "@/server/"
import { likes, posts } from "../schema"
import { formSchema } from "@/lib/formSchema"
import * as z from "zod"
import { revalidatePath } from "next/cache"
import { createSafeActionClient } from "next-safe-action"
import { eq, and, desc } from "drizzle-orm"
import { auth } from "@/server/auth"

export const action = createSafeActionClient()

export const createPost = action(formSchema, async ({ content }) => {
  const session = await auth()
  console.log(session?.user?.id)
  if (!content || !session?.user?.id) return { error: "Something went wrong" }
  const newPost = await db.insert(posts).values({
    content,
    user_id: session.user.id,
  })
  revalidatePath("/")
  if (!newPost) return { error: "Could not create post" }
  if (newPost[0]) return { success: "Post Created" }
})

const deleteSchema = z.object({
  id: z.string(),
})
export const deletePost = action(deleteSchema, async ({ id }) => {
  try {
    await db.delete(posts).where(eq(posts.id, id))
    revalidatePath("/")
    return { success: "Product deleted" }
  } catch (error) {
    return { error: "Something went wrong" }
  }
})

export const fetchPosts = async () => {
  const posts = await db.query.posts.findMany({
    with: {
      author: true,
      likes: true,
    },
    orderBy: (posts, { desc }) => [desc(posts.timestamp)],
  })
  if (!posts) return { error: "No posts 😓" }
  if (posts) return { success: posts }
}

const addLikeSchema = z.object({
  post_id: z.string(),
  user_id: z.string(),
})

export const addLike = action(addLikeSchema, async ({ post_id, user_id }) => {
  const existingLike = await db.query.likes.findFirst({
    where: and(eq(likes.post_id, post_id), eq(likes.user_id, user_id)),
  })
  if (existingLike) {
    await db.delete(likes).where(eq(likes.id, existingLike.id))
    revalidatePath("/")
    return { success: "Removed Like" }
  }

  if (!existingLike) {
    const like = await db
      .insert(likes)
      .values({
        post_id,
        user_id,
      })
      .returning()
      .catch((error) => {
        if (error) return { error: error }
      })

    revalidatePath("/")
    return { success: like }
  }
})
