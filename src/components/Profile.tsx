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
import { UserAuth } from "@/app/context/AuthContext";

const Profile = () => {
  const { user, signInWithGoogle, signOutUser } = UserAuth();

  console.log(user);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-background w-12 h-12 lg:flex justify-center items-center rounded-full">
          {!user ? (
            <AvatarIcon className="w-6 h-6" />
          ) : (
            <div className="w-12 h-12 flex justify-center items-center rounded-full border-2">
              {user.displayName[0]}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!user ? (
            <>
              <DropdownMenuItem asChild>
                <li onClick={signInWithGoogle}>Sign In</li>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <li onClick={signInWithGoogle}>Sign Up</li>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">{user.displayName}</Link>
              </DropdownMenuItem>
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
