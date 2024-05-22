"use client";

import MainNavBar from "@/components/nav/navbar";
import LandingHeader from "./components/header/header";
import MainHeader from "@/components/layout/header";
import MySessionProvider from "@/+core/providers/session";

import { MyApolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function LayoutLanding({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider client={MyApolloClient}>
      <MySessionProvider>
        <MainHeader />
        <LandingHeader />
        <MainNavBar />
        <div className="w-[100%] min-h-[45rem] flex align-middle text-center pl-40 pr-40">
          {" "}
          {children}
        </div>
      </MySessionProvider>
    </ApolloProvider>
  );
}
