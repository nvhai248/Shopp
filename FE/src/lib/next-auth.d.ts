import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    data: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };

    accessToken: string;
    expired_accessToken: number;
    refreshToken: string;
    expired_refreshToken: number;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    data: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };

    accessToken: string;
    expired_accessToken: number;
    refreshToken: string;
    expired_refreshToken: number;
  }
}
