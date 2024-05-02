import LandingHeader from "@/components/landing/header/header";
import { LandingCarouse } from "@/components/landing/main/main-carousel";
import MainNavBar from "@/components/nav/navbar";

export default function Home() {
  return (
    <main>
      <LandingHeader />
      <MainNavBar />
      <div className="w-[100%] flex align-middle text-center pl-40 pr-40">
        <LandingCarouse />
      </div>
    </main>
  );
}
