"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import Avatar from "./components/avatar";
import { useSession } from "next-auth/react";
import RequireSignIn from "@/components/ui/require-signin";
import Spinner from "@/components/ui/spinner";

const profileSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string(),
  status: z.string(),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.object({
    day: z.string(),
    month: z.string(),
    year: z.string(),
  }),
});

export default function FormProfile() {
  const { data: session, status } = useSession();

  const [notification, setNotification] = useState<string>("");

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: session?.user?.firstName,
      lastName: session?.user?.lastName,
      email: session?.user?.email,
      status: session?.user?.status,
      gender: session?.user?.gender,
      dateOfBirth: { day: "1", month: "January", year: "1990" },
    },
  });

  if (status === "loading") {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={100} />
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return <RequireSignIn />;
  }

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    // Simulate form submission
    console.log("Form values:", values);
  };

  return (
    <div className="flex flex-row">
      <div className="p-12">
        <Avatar />
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 grid grid-cols-2 gap-4">
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  {...form.register("firstName")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                />
                {form.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  {...form.register("lastName")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  {...form.register("email")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                  type="email"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Input
                  {...form.register("status")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm items-center font-medium text-gray-700">
                  Gender
                </label>
                <RadioGroup
                  {...form.register("gender")}
                  className="mt-4 flex space-x-4"
                  defaultValue="MALE"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="MALE" />
                    <Label htmlFor="MALE">Male</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="FEMALE" />
                    <Label htmlFor="FEMALE">Female</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="UNDEFINED" id="UNDEFINED" />
                    <Label htmlFor="UNDEFINED">Undefined</Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="flex space-x-4 mt-1">
                  <div className="block w-1/3 border-gray-300 rounded-none shadow-sm">
                    <Select {...form.register("dateOfBirth.day")}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Days</SelectLabel>
                          {[...Array(31)].map((_, i) => (
                            <SelectItem key={i} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="block w-1/3 border-gray-300 rounded-none shadow-sm">
                    <Select {...form.register("dateOfBirth.month")}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Days</SelectLabel>
                          {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ].map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="block w-1/3 border-gray-300 rounded-none shadow-sm">
                    <Select {...form.register("dateOfBirth.year")}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Days</SelectLabel>
                          {Array.from({ length: 100 }, (_, i) => 1920 + i).map(
                            (year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 mt-4 rounded-none bg-blue-600 text-white"
            >
              Save
            </Button>

            {notification && (
              <p className="mt-2 text-red-500 text-sm">{notification}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
