import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Credentials from "next-auth/providers/credentials"
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
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      return token
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, update } = NextAuth(authConfig)
