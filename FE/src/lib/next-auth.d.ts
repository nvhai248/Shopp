// Type declarations for NextAuth and JWT

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar: string;
    } | null;
    error?: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    expired_accessToken: number;
    refreshToken: string;
    expired_refreshToken: number;
    error?: string;
  }
}
