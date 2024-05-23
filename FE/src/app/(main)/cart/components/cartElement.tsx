import UpdateQuantity from "./changeQuantity";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function CartElement() {
  return (
    <div className="flex flex-wrap mb-4">
      <div className="lg:w-1/4 w-full mb-4 lg:mb-0">
        <div className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
            className="w-full"
            alt="Blue denim shirt"
          />
        </div>
      </div>
      <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
        <p className="font-semibold ml-4">Blue denim shirt</p>
        <div className="flex space-x-2">
          <button
            className="text-3xl text-red-600 hover:text-red-800 p-4"
            title="Remove item"
          >
            <RiDeleteBin5Line />
          </button>
          <button
            className="text-sm text-red-600 hover:text-red-800"
            title="Move to the wish list"
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div className="lg:w-1/4 w-full">
        <UpdateQuantity />
        <p className="text-center font-semibold">$17.99</p>
      </div>
    </div>
  );
}
