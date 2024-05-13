import { AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import NotificationDropDownMenu from "./notification-btn";
import { ChangeLanguageDropDown } from "./change-language";

const MainHeader = () => {
  const item = false ? (
    <AvatarIcon className="w-4 h-4 mr-4 mt-0.5" />
  ) : (
    <Link className="flex mr-4 text-sm hover:text-black" href="/login">
      <p>Sign in or Create Account</p>
    </Link>
  );

  return (
    <header className="flex bg-gradient-to-l from-blue-600 to-blue-700 pl-40 pr-40 text-white justify-between items-center h-10 shadow-md">
      <div>
        <a href="/seller" className="hover:text-black">
          GO TO SELLER PAGE
        </a>
      </div>

      <div className="flex">
        <div className="mr-4 hover:text-black">
          <NotificationDropDownMenu />
        </div>

        <div className="mr-4 mt-0.5 hover:text-black">
          <ChangeLanguageDropDown />
        </div>

        {item}
      </div>
    </header>
  );
};

export default MainHeader;
