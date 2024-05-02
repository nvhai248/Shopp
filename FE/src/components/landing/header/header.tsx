import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import SearchDropdown from "./search-dropdown";
import { IoCart } from "react-icons/io5";

const LandingHeader = () => {
  return (
    <header className="flex bg-white pl-40 pr-40 pt-5 pb-5 text-black justify-between items-center">
      <img src="icon.jpg" className="w-20 h-20" alt="icon" />
      <div className="flex w-full max-w-2xl items-center">
        <SearchDropdown />
        <Input
          className="rounded-none h-12"
          type="email"
          placeholder="Search..."
        />
        <Button className="rounded-none bg-blue-700 h-12" type="submit">
          {" "}
          <SearchIcon />{" "}
        </Button>
      </div>
      <div className="flex mr-10 hover:cursor-pointer">
        <IoCart className="text-5xl" />
        <p className="mt-3">$ 0.00 USD</p>
      </div>
    </header>
  );
};

export default LandingHeader;
