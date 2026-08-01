"use client";

import { useState } from "react";
import { Order } from "@/lib/types";
import DownloadOrderInvoice from "./Download";
import { User } from "next-auth";

interface OrderHistoryProps {
  orders: Order[];
  loading: boolean;
  user: User;
}

export default function OrderHistory({
  orders,
  loading,
  user,
}: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A92EDF]"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : selectedOrder ? (
        <div className="bg-[#1A2C5F] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">
              Order #{selectedOrder.id.slice(0, 8)}
            </h3>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-[#A92EDF] hover:text-[#A92EDF]/80 cursor-pointer"
            >
              Back to orders
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0C1B44] p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">
                Order Date
              </h4>
              <p className="text-white">
                {formatDate(selectedOrder.createdAt)}
              </p>
            </div>
            <div className="bg-[#0C1B44] p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status.charAt(0).toUpperCase() +
                  selectedOrder.status.slice(1)}
              </span>
            </div>
            <div className="bg-[#0C1B44] p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">
                Total Amount
              </h4>
              <p className="text-white">₹{selectedOrder.totalAmount}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-medium text-white mb-4">Order Items</h4>
            <div className="space-y-4">
              {selectedOrder.products.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-[#0C1B44] rounded-lg"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src={item.product.logoImage}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">
                      {item.product.title}
                    </h5>
                    {item.product.category && (
                      <p className="text-gray-400 text-sm">
                        Category: {item.product.category}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-white">
                    ₹{item.product.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <DownloadOrderInvoice order={selectedOrder} user={user} />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-[#1A2C5F]">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#0C1B44] divide-y divide-[#1A2C5F]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#1A2C5F]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-[#A92EDF] hover:text-[#A92EDF]/80 cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
