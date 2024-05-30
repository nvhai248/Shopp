"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { CartItem } from "@/+core/interfaces";
import { useSession } from "next-auth/react";
import { GetCartQuery } from "@/+core/definegql";
import { MdOutlinePayments } from "react-icons/md";
import CheckoutProduct from "./checkoutProduct";
import Spinner from "@/components/ui/spinner";
import RequireSignIn from "@/components/ui/require-signin";
import ShowContacts from "./components/showContact";

const Checkout = () => {
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GetCartQuery, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  let cartItems: CartItem[] = [];
  if (error) {
    console.log(error);
  } else {
    cartItems = data?.getCart || []; // Provide a default empty array
  }

  let totalPrice = 0;
  let discountTotal = 0;

  for (let item of cartItems) {
    if (item.product.isOnSale) {
      totalPrice += item.product.priceSale * item.quantity;
    } else {
      totalPrice += item.product.price * item.quantity;
    }
  }

  let paymentTotal = totalPrice + discountTotal;

  if (loading) {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={100} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <RequireSignIn />;
  }

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-none border shadow-md">
        <div className="text-start">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <FaMapMarkerAlt className="mt-1" />
            <span className="ml-4">Địa Chỉ Nhận Hàng</span>
          </h2>
          <div className="border-b pb-6 mb-6 text-start flex justify-between">
            <div className="mb-4">
              <span className="font-bold">Nguyễn Văn Hải (+84) 813042255</span>
              <span className="ml-5">
                333/7a, Đường Lê Văn Sỹ, Phường 1, Quận Tân Bình, TP. Hồ Chí
                Minh
              </span>
            </div>
            <ShowContacts />
          </div>
        </div>

        <div className="border-b pb-6 mb-6">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <IoCart className="mt-1" /> <span className="ml-4">Products</span>
          </h2>

          <CheckoutProduct cartItems={cartItems} />
        </div>

        <div className="text-start">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <BiSolidDiscount className="mt-1" />
            <span className="ml-4">Voucher</span>
          </h2>
          <div className="border-b pb-6 mb-6 text-start flex justify-between">
            <div className="mb-4">
              <span className="font-bold">Discount Name</span>
              <span className="ml-5">Discount Type:, Value: .....</span>
            </div>
            <button className="text-blue-500 underline mb-5">
              Select Voucher
            </button>
          </div>
        </div>

        <div className="text-start flex justify-between border-b-2">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <MdOutlinePayments className="mt-1" />
            <span className="ml-4">Payment Method</span>
          </h2>
          <div>
            <ToggleGroup type="single">
              <ToggleGroupItem value="COD" aria-label="COD">
                Payment on delivery
              </ToggleGroupItem>
              <ToggleGroupItem value="CREDIT_CARD" aria-label="CREDIT_CARD">
                Payment on credit card
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="pb-4 border-b-2 border-dotted">
          <div className="mt-4 w-[30rem] ml-[46rem]">
            <div className="flex justify-between mb-2">
              <span className="text-start">Merchandise Subtotal:</span>
              <span className="font-bold">$ {totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-start">Shipping Total:</span>
              <span className="font-bold">$ 0.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-start">Discount Total:</span>
              <span className="font-bold">$ {discountTotal}</span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="text-start">Total Payment:</span>
              <span className="text-end text-4xl text-blue-600">
                $ {paymentTotal}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <p className="text-sm text-gray-600">
            Clicking "Place Order" means you agree to abide by the{" "}
            <span className="text-blue-500 hover:text-blue-700">
              HShopp Terms
            </span>
          </p>
          <Button className="py-3 px-6 bg-blue-600 text-white rounded-none shadow-md hover:bg-blue-700 transition duration-300">
            Place an Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
