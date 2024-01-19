"use client"
import { FaUser } from "react-icons/fa"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Session } from "next-auth/types"
import { signOut } from "next-auth/react"
import { LogOut, Settings, TruckIcon } from "lucide-react"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const UserButton = ({ user }: Session) => {
  const [isChecked, setChecked] = useState(false)

  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-6" align="end">
        <div className="mb-4 p-4 flex flex-col items-center gap-2 bg-primary-foreground rounded-lg">
          <Image
            src={user.image || ""}
            alt={user.name || ""}
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="font-medium text-sm">Hey {user.name} 👋</p>
          <span className="text-xs text-secondary-foreground">
            {user.email}
          </span>
        </div>
        <DropdownMenuItem
          className="py-4 px-2 flex items-center font-medium focus:bg-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="mr-4 px-1" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
