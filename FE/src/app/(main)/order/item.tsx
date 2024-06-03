import { OrderDetailItem } from "@/+core/interfaces";

interface OrderItemsProps {
  items: OrderDetailItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-100">
        <thead>
          <tr>
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Avatar</th>
            <th className="py-2 px-4">Rate</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 px-4">{item.product.name}</td>
              <td className="py-2 px-4">{item.price}</td>
              <td className="py-2 px-4">{item.quantity}</td>
              <td className="py-2 px-4">
                <img
                  src={item.product.avatar}
                  alt={item.product.name}
                  className="w-8 h-8 rounded-full"
                />
              </td>
              <td className="py-2 px-4">{item.product.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
