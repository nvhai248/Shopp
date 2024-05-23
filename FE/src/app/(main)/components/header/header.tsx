import { IoCart } from "react-icons/io5";
import Link from "next/link";
import SearchInput from "./search-input";

const LandingHeader = () => {
  return (
    <div className="w-full bg-white flex justify-center">
 <header className="flex pt-5 pb-5 text-black justify-between items-center w-4/5">
      <Link
        href="/"
        className="flex text-6xl font-mono font-semibold hover:cursor-pointer "
      >
        <span className="text-white font-bold bg-gradient-to-r from-blue-500 to-blue-700 px-2 rounded-md">
          H
        </span>
        <p className="text-blue-700">Shopp</p>
      </Link>

      <SearchInput />

      <div className="flex mr-10 hover:cursor-pointer">
        <IoCart className="text-5xl" />
        <p className="mt-3">$ 0.00 USD</p>
      </div>
    </header>
    </div>
   
  );
};

export default LandingHeader;
