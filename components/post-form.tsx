"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { formSchema } from "@/lib/formSchema"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { createPost } from "@/server/actions/create-post"
import { useAction } from "next-safe-action/hooks"

export default function PostForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })
  const { execute, status } = useAction(createPost, {
    onSuccess(data) {
      if (data?.error) console.log(data.error)
      if (data?.success) console.log(data.success)
    },
    onExecute(data) {
      console.log("creating post....")
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute(values)
    form.reset()
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create Post</FormLabel>
                <FormControl>
                  <Input placeholder="I went out in the snow" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={status === "executing"} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  )
}
