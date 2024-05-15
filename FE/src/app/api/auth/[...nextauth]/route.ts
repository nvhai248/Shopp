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
          Authorization: `Bearer ${token.refreshToken}`,
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
        email: {},
        password: {},
        isRememberMe: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const loginInput: LoginInput = {
          email: credentials.email,
          password: credentials.password,
          isRememberMe: credentials?.isRememberMe == "false" ? false : true,
        };

        const { data, errors } = await MyApolloClient.mutate({
          mutation: LoginMutation,
          variables: { loginInput: loginInput },
        });

        if (data?.login) {
          return data.login;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.expired_accessToken) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.data = token.data;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expired_accessToken = token.expired_accessToken;
      session.expired_refreshToken = token.expired_refreshToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
