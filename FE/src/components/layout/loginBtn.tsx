"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const DynamicLoginBtn = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[100px]" />
          <Skeleton className="h-2 w-[80px]" />
        </div>
      </div>
    );
  }

  if (session && session.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm flex hover:cursor-pointer hover:text-black">
          <Avatar className="w-5 h-5 mr-2 mt-0.25">
            <AvatarImage src={session.user.avatar as string} alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>
            {session.user.firstName && session.user.lastName
              ? session.user.firstName + " " + session.user.lastName
              : session.user.email}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-none">
          <DropdownMenuItem>My Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Purchase Order</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <a className="flex mr-4 text-sm hover:text-black" href="/login">
      <p>Sign in or Create Account</p>
    </a>
  );
};

export default DynamicLoginBtn;
