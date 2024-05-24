// app/api/auth/[...nextauth]/route.ts

import { Login, RefreshAccessToken } from "@/+core/services";
import { GetProfile } from "@/+core/services/user/getProfile";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await RefreshAccessToken(token.refreshToken);

    if (data?.refreshAccessToken) {
      return {
        ...token,
        accessToken: data.refreshAccessToken.accessToken,
        expired_accessToken: data.refreshAccessToken.expired_accessToken,
      };
    }
  } catch (err) {
    // Optionally handle token refresh failure
  }

  return { ...token, error: "RefreshAccessTokenError" };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isRememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, errors } = await Login(
          credentials.email,
          credentials.password,
          credentials.isRememberMe === "true"
        );

        if (data?.login) {
          return data.login;
        }

        if (errors) {
          throw errors[0];
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (Date.now() < token.expired_accessToken) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ session, token }) {
      try {
        const { data } = await GetProfile(token.accessToken);

        session.user = data?.getProfile ?? null;
        session.accessToken = token.accessToken;
      } catch (err) {
        console.error("Error fetching profile", err);
        session.error = "SessionFetchError";
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
