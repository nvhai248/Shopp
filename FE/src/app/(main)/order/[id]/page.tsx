"use client";

import { DetailOrderQuery } from "@/+core/definegql";
import { Order } from "@/+core/interfaces";
import Spinner from "@/components/ui/spinner";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import { useQuery } from "@apollo/client";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import OrderItems from "../components/item";
import { BiSolidDiscount } from "react-icons/bi";
import { PAYMENT_METHOD, PROMOTION_TYPE, STATUS_ORDER } from "@/+core/enums";
import formatter from "@/lib/formatDate";
import { MdOutlinePayments } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import Stepper from "../components/stepper";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const { data, loading, error } = useQuery(DetailOrderQuery, {
    variables: { id: id },
  });

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
    return <SomethingWhenWrong />;
  }

  let orderDetail: Order;
  orderDetail = data.order;

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-none border shadow-md">
        <div className="py-4">
          <Stepper status={orderDetail.status} />
        </div>

        <div className="text-start">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <FaMapMarkerAlt className="mt-1" />
            <span className="ml-4">Delivery Address</span>
          </h2>
          <div className="border-b pb-6 mb-6 text-start flex justify-between">
            <div className="mb-4">
              <div className="mb-4">
                <span className="font-bold">
                  {orderDetail?.contact?.fullName}{" "}
                  {orderDetail?.contact?.phoneNumber}
                </span>
                <span className="ml-5">
                  {orderDetail?.contact?.detailAddress},{" "}
                  {orderDetail?.contact?.wards},{" "}
                  {orderDetail?.contact?.district},{" "}
                  {orderDetail?.contact?.province}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b pb-6 mb-6">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <IoCart className="mt-1" /> <span className="ml-4">Products</span>
          </h2>

          <OrderItems items={orderDetail.items || []} />
        </div>

        <div className="text-start">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <BiSolidDiscount className="mt-1" />
            <span className="ml-4">Voucher</span>
          </h2>
          <div className="border-b pb-6 mb-6 text-start flex justify-between">
            <span className="ml-5">
              {orderDetail?.promotion?.type === PROMOTION_TYPE.PERCENT
                ? orderDetail?.promotion?.discountValue + " $"
                : orderDetail?.promotion?.discountPercentage + "%"}{" "}
              off
              {", min spend: "} ${orderDetail?.promotion?.minValue}
              {", expired: "}
              {orderDetail?.promotion?.endDate
                ? formatter.format(new Date(orderDetail?.promotion?.endDate))
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="text-start flex justify-between border-b-2 border-dotted">
          <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
            <MdOutlinePayments className="mt-1" />
            <span className="ml-4">Payment Method</span>
          </h2>
          <div>
            <Badge>
              {orderDetail?.paymentMethod == PAYMENT_METHOD.COD
                ? "Payment on delivery"
                : "Payment with credit card"}
            </Badge>
          </div>
        </div>

        <div className="pb-4 border-b-2 border-dotted flex justify-between">
          <div></div>
          <div className="mt-4 w-[30rem]">
            <div className="flex justify-between mb-2">
              <span className="text-start">Merchandise Subtotal:</span>
              <span className="font-bold">$ {orderDetail.totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-start">Shipping Total:</span>
              <span className="font-bold">$ 0.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-start">Discount Total:</span>
              <span className="font-bold">$ {orderDetail.reducePrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-start">Is Paid:</span>
              <span className="font-bold">
                {orderDetail.isPaid ? (
                  <Badge className="bg-green-500 text-white">Paid</Badge>
                ) : (
                  <Badge className="bg-red-500 text-white">Unpaid</Badge>
                )}
              </span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="text-start">Total Payment:</span>
              <span className="text-end text-4xl text-blue-600">
                $ {orderDetail.priceToPay}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
