"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const DynamicIcon = () => {
  const { user, error, isLoading } = useUser();

  const item = user ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm flex hover:cursor-pointer hover:text-black">
        <Avatar className="w-5 h-5 mr-2 mt-0.25">
          <AvatarImage src={user.picture as string} alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{user?.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuItem>My Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Purchase Order</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/api/auth/logout">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <a className="flex mr-4 text-sm hover:text-black" href="/api/auth/login">
      <p>Sign in or Create Account</p>
    </a>
  );
  return <>{item}</>;
};

export default DynamicIcon;
