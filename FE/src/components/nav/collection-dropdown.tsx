import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, MenuIcon } from "lucide-react";

const CollectionDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="bg-gray-800 border-x-1 border-white rounded-none"
          type="button"
        >
          <MenuIcon className="mr-2" />
          ALL COLLECTIONS
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none mt-1">
        <DropdownMenuItem>Collection 1 </DropdownMenuItem>
        <DropdownMenuItem>Collection 2 </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionDropDown;
