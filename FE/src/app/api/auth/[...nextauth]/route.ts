// app/api/auth/[...nextauth]/route.ts

import { LoginMutation } from "@/+core/definegql/mutations/login";
import { refreshATMutation } from "@/+core/definegql/mutations/refreshATK";
import { LoginInput } from "@/+core/interfaces/login";
import { MyApolloClient } from "@/lib/apolloClient";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await MyApolloClient.mutate({
      mutation: refreshATMutation,
      context: {
        headers: {
          Authorization: `Bearer ${token.backendTokens.refreshToken}`,
        },
      },
    });

    if (data?.refreshAccessToken) {
      return {
        ...token,
        backendTokens: data.refreshAccessToken,
      };
    }
  } catch (err) {
    console.error("Error refreshing token", err);
  }

  return {
    ...token,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const loginInput: LoginInput = {
          email: credentials.email,
          password: credentials.password,
          isRememberMe: true,
        };

        try {
          const { data } = await MyApolloClient.mutate({
            mutation: LoginMutation,
            variables: { loginInput },
          });

          console.log(data);

          if (data?.login) {
            return data.login;
          }
        } catch (err) {
          console.error("Error logging in", err);
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expired_accessToken) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
