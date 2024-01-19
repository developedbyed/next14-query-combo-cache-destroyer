import { Lobster_Two } from "next/font/google"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"
import { Button } from "./ui/button"
import { UserButton } from "./user-button"
import Link from "next/link"
const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] })

export default async function Nav() {
  const user = await auth()
  if (!user) redirect("/api/auth/signin")
  return (
    <nav className={lobster.className}>
      <ul className="flex py-8 justify-between items-center">
        <li>Post it</li>

        <li>
          {!user ? (
            <Button asChild>
              <Link href={"/auth/login"}>Sign In</Link>
            </Button>
          ) : (
            <UserButton expires={user.expires} user={user.user} />
          )}
        </li>
      </ul>
    </nav>
  )
}
