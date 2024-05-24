"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import CollectionDropDown from "./collection-dropdown";
import Link from "next/link";
import { USER_STATUS } from "@/+core/enums";

const MainNavBar = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex justify-center w-full bg-gray-800">
        <nav className="flex w-4/5 text-white items-center h-12 shadow-md">
          <CollectionDropDown />
        </nav>
      </div>

      {status === "loading" && (
        <header className="flex w-full text-white bg-gray-100 justify-between items-center h-10">
          <Skeleton className="h-3 w-[20rem] ml-[10%]" />
        </header>
      )}

      {session &&
        session.user &&
        session.user.status === USER_STATUS.UNVERIFIED && (
          <header className="flex w-full text-red-500 bg-gray-100 justify-between items-center h-10">
            <Link href="/verification" className="ml-[10%] underline">
              Please verify your account first.
            </Link>
          </header>
        )}
    </>
  );
};

export default MainNavBar;
