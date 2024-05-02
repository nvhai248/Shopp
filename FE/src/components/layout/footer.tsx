import { FaCcVisa } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { FaCcDiscover } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";

const MainFooter = () => {
  return (
    <footer className="bg-black text-white flex py-4 text-center">
      <div className="ml-10">&copy; HShopp. All rights reserved.</div>
      <div className="text-3xl flex ml-auto mr-10 space-x-4">
        <FaCcVisa />
        <FaMeta />
        <FaCcDiscover />
        <FaCcPaypal />
        <FaCcMastercard />
      </div>
    </footer>
  );
};

export default MainFooter;
