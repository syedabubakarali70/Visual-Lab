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
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9  w-9">
          {!user ? (
            <AvatarIcon className="w-6 h-6" />
          ) : (
            <div className="w-9 h-9 flex justify-center items-center border-2 rounded-full">
              {user && user.displayName.charAt(0)}
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
