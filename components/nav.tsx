import { Lobster_Two } from "next/font/google"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] })

export default async function Nav() {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")
  return (
    <nav className={lobster.className}>
      <ul className="flex py-8 justify-between items-center">
        <li>Post it</li>
        <li>
          <Image
            src={session.user?.image as string}
            width={24}
            alt={session.user?.name as string}
            height={24}
            className="rounded-full"
          />
        </li>
      </ul>
    </nav>
  )
}
