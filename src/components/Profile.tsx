import { AvatarIcon } from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
  
const Profile = () => {
  return (
    <div >
    <DropdownMenu>
  <DropdownMenuTrigger className="cursor-pointer hover:bg-background w-12 h-12 lg:flex justify-center items-center rounded-full" ><AvatarIcon className="w-6 h-6"/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
    <DropdownMenuItem asChild><Link href="/signup">Sign Up</Link></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
  )
}

export default Profile