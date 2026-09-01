type Order = {
  _id?: string;
  id?: string;
  customer?: {
    name?: string;
    email?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
  totalAmount?: number;
  status?: string;
};

type Props = {
  orders?: Order[];
};

export default function RecentOrders({
  orders = [],
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

      <div className="border-b border-gray-100 p-6">

        <h2 className="text-xl font-bold text-[#2A2421]">
          Recent Orders
        </h2>

        <p className="text-sm text-gray-500">
          Latest customer orders
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead>
            <tr className="border-b border-gray-100 text-left text-sm text-gray-500">

              <th className="px-6 py-4">
                Order
              </th>

              <th className="px-6 py-4">
                Customer
              </th>

              <th className="px-6 py-4">
                Amount
              </th>

              <th className="px-6 py-4">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {

                const customer =
                  order.customer?.name ||
                  order.user?.name ||
                  order.customer?.email ||
                  order.user?.email ||
                  "Customer";

                const orderId =
                  order._id ||
                  order.id ||
                  "N/A";

                return (
                  <tr
                    key={orderId}
                    className="border-b border-gray-50"
                  >

                    <td className="px-6 py-4 font-semibold">
                      <a href={`/admnin/orders/${orderId}`}>
                        {(order as any).orderNumber || `#${String(orderId).slice(-6)}`}
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      {customer}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {(order.totalAmount || 0).toFixed(2)} ETB
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        {order.status || "Pending"}
                      </span>

                    </td>

                  </tr>
                );
              })
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}