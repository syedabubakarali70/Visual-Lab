"use client";
import { AvatarIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { userAuth } from "@/app/context/AuthContext";

const Profile = () => {
  const { user, signInWithGoogle, signOutUser } = userAuth();

  console.log(user);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-background w-12 h-12 lg:flex justify-center items-center rounded-full">
          <AvatarIcon className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!user ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <li onClick={signInWithGoogle}>Sign Up</li>
              </DropdownMenuItem>
            </>
          ) : (
            <>
            <div className="flex flex-col items-center">
              {user.displayName}</div>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Profile</Link>
              </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <li onClick={signOutUser}>Logout</li>
            </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
