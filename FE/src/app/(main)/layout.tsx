import MainNavBar from "@/components/nav/navbar";
import LandingHeader from "./components/header/header";
import MainHeader from "@/components/header/header";

export default function LayoutLanding({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <MainHeader />
      <LandingHeader />
      <MainNavBar />
      <div className="w-[100%] min-h-[45rem] flex align-middle text-center pl-40 pr-40">
        {" "}
        {children}
      </div>
    </main>
  );
}
