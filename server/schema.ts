import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { timestamp, primaryKey } from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"
import { createId } from "@paralleldrive/cuid2"

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
})

export const likes = pgTable("likes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id, {
      onDelete: "cascade",
    }),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
})

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postsRelations = relations(posts, ({ many, one }) => ({
  likes: many(likes),
  author: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
}))
export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.post_id],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.user_id],
    references: [users.id],
  }),
}))
