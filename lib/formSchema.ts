import * as z from "zod"

export const formSchema = z.object({
  content: z.string().min(2, {
    message: "Post must be at least 2 characters.",
  }),
})
