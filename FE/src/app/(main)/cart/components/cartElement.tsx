import { ProductInCart } from "@/+core/interfaces";
import UpdateQuantity from "./changeQuantity";
import { RiDeleteBin5Line } from "react-icons/ri";

interface CartElementProps {
  product: ProductInCart;
  quantity: number;
}

const CartElement: React.FC<CartElementProps> = ({ product, quantity }) => {
  return (
    <div className="flex flex-wrap py-5 border-b-2">
      <div className="lg:w-1/4 w-full mb-4 lg:mb-0">
        <div className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={product.avatar}
            className="w-full h-[300px] p-10"
            alt={product.name}
          />
        </div>
      </div>
      <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
        <p className="font-semibold ml-4">{product.name}</p>
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
        <p className="text-center font-semibold">{product.price}</p>
      </div>
    </div>
  );
};

export default CartElement;
