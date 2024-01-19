import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import { eq } from "drizzle-orm"
import { accounts, users } from "./schema"

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session }) {
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig

export const { handlers, auth, signIn } = NextAuth(authConfig)
