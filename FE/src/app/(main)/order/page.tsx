import { HistoriesOrderQuery } from "@/+core/definegql";
import { useQuery } from "@apollo/client";

const OrderDetailPage = () => {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery(HistoriesOrderQuery, {
    variables: { limit: 1, page: 10 },
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { historiesOrder } = data;

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
              <th className="py-2 px-4">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {historiesOrder.data.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.isPaid ? "Yes" : "No"}</td>
                <td className="py-2 px-4">{order.totalPrice}</td>
                <td className="py-2 px-4">{order.priceToPay}</td>
                <td className="py-2 px-4">{order.reducePrice}</td>
                <td className="py-2 px-4">{order.paymentMethod}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">{order.createdAt}</td>
                <td className="py-2 px-4">{order.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailPage;
