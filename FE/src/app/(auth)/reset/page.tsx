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

export default function Reset() {
  return (
    <Card className="w-[400px] h-[300px] ml-10 rounded-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Reset Password</CardTitle>
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-3 h-12 rounded-none">Send Email</Button>

        <Link className="hover:text-blue-700" href="/login">
          Back to Sign in?
        </Link>
      </CardFooter>
    </Card>
  );
}
