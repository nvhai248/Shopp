import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

const CollectionDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-full pl-1 pr-10 border-x-2 border-white hover:bg-black">
        <div className="flex rounded-none">
          <MenuIcon className="mr-2" />
          ALL COLLECTIONS
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuItem>Collection 1 </DropdownMenuItem>
        <DropdownMenuItem>Collection 2 </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionDropDown;
