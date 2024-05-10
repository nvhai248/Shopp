import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Register() {
  return (
    <Card className="w-[400px] h-[550px] ml-10 rounded-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                className="rounded-none h-12"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="rounded-none h-12"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Re Enter Password</Label>
              <Input
                id="password"
                type="password"
                className="rounded-none h-12"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-3 h-12 rounded-none">Sign In</Button>
        <div className="flex mb-3">
          <hr className="w-[10rem] mt-3 mr-1" />
          Or
          <hr className="w-[10rem] mt-3 ml-1" />
        </div>
        <Button className="w-full h-12 mb-3 rounded-none">Google</Button>
        <p>
          Already had account?{" "}
          <Link className="hover:text-blue-700" href="/login">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
