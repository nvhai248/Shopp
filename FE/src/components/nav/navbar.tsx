import CollectionDropDown from "./collection-dropdown";

const MainNavBar = () => {
  return (
    <nav className="flex bg-gray-800 pl-40 pr-40 text-white justify-between items-center h-12 shadow-md">
      <CollectionDropDown />
    </nav>
  );
};

export default MainNavBar;
