"use client";

import { useSession } from "next-auth/react";
import { RiContactsBook3Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { PiPasswordBold } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavBarUser() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-1/4 flex space-x-4 flex-col mt-5">
        <Skeleton className="h-[100px] w-[100px] rounded-full" />
        <Skeleton className="h-[30px] w-[300px] mt-5" />
        <Skeleton className="h-[30px] w-[300px] mt-5" />
      </div>
    );
  }

  return (
    <aside className="w-1/4 text-start bg-white pt-4 border-r-2">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={
              session && session.user && session.user.avatar
                ? session.user.avatar
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{session?.user?.email}</h2>
            <a href="#" className="text-blue-500 flex flex-row text-sm">
              <CiEdit className="mt-1 mr-2" /> <span> Edit Profile</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="px-4 py-4 text-black hover:bg-gray-200 flex flex-row cursor-pointer">
            <CgProfile className=" mr-10 text-2xl" /> <span>Profile</span>
          </li>
          <li className="px-4 py-4 text-black hover:bg-gray-200 flex flex-row cursor-pointer">
            <RiContactsBook3Fill className=" mr-10 text-2xl" />{" "}
            <span>Contacts</span>
          </li>
          <li className="px-4 py-4 text-black hover:bg-gray-200 flex flex-row cursor-pointer">
            <PiPasswordBold className=" mr-10 text-2xl" />{" "}
            <span> Change Password</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
