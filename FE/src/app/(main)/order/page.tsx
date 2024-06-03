"use client";

import { HistoriesOrderQuery } from "@/+core/definegql";
import { PagingOrder, OrderDetailItem } from "@/+core/interfaces";
import Spinner from "@/components/ui/spinner";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import formatter from "@/lib/formatDate";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import OrderItems from "./item";

const OrderDetailPage = () => {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery(HistoriesOrderQuery, {
    variables: { pagingOrderInput: { limit: 10, page: 1 } },
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

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

  const historiesOrder: PagingOrder = data.historiesOrder;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Paid</th>
              <th className="py-2 px-4">Total Price</th>
              <th className="py-2 px-4">Price To Pay</th>
              <th className="py-2 px-4">Reduce Price</th>
              <th className="py-2 px-4">Payment Method</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {historiesOrder.data.map((order) => (
              <>
                <tr
                  key={order.id}
                  className="border-b border-gray-200 cursor-pointer"
                  onClick={() => handleRowClick(order.id)}
                >
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.isPaid ? "Yes" : "No"}</td>
                  <td className="py-2 px-4">{order.totalPrice}</td>
                  <td className="py-2 px-4">{order.priceToPay}</td>
                  <td className="py-2 px-4">{order.reducePrice}</td>
                  <td className="py-2 px-4">{order.paymentMethod}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">
                    {formatter.format(new Date(order.createdAt))}
                  </td>
                </tr>
                {selectedOrderId === order.id && (
                  <tr key={`${order.id}-items`}>
                    <td colSpan={8} className="p-4">
                      <OrderItems items={order.items || []} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailPage;
