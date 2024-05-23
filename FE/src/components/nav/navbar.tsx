import { Divide } from "lucide-react";
import CollectionDropDown from "./collection-dropdown";

const MainNavBar = () => {
  return (
    <div className="flex justify-center w-full bg-gray-800">
 <nav className="flex w-4/5 text-white items-center h-12 shadow-md">
      <CollectionDropDown />
    </nav>
    </div>
   
  );
};

export default MainNavBar;
