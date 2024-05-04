import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const SearchDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex bg-white pt-3 text-black text-center border w-40 h-12 hover:bg-blue rounded-none">
          <p className="pl-2 mr-5">All collections</p>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuItem>Collection 1 </DropdownMenuItem>
        <DropdownMenuItem>Collection 2 </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropdown;
