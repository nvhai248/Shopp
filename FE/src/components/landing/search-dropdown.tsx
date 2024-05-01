import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const SearchDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="bg-white text-black border hover:bg-white rounded-none"
          type="button"
        >
          All collections
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuItem>Collection 1 </DropdownMenuItem>
        <DropdownMenuItem>Collection 2 </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropdown;
