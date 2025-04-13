"use client";

import { User } from "next-auth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileSettings from "./ProfileSettings";
import OrderHistory from "./OrderHistory";
import { getUserOrder } from "@/app/actions/order.actions";
import { Order } from "@/lib/types";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        try {
          setLoadingOrders(true);
          const response = await getUserOrder();

          if (response.success && response.orders) {
            setOrders(response.orders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          setOrders([]);
        } finally {
          setLoadingOrders(false);
        }
      };

      fetchOrders();
    }
  }, [activeTab, user.id]);

  return (
    <div className="flex w-full justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl bg-[#0C1B44] rounded-3xl px-4 py-8 shadow-xl hover:shadow-2xl transition-shadow border-2 border-[#A92EDF]"
      >
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="w-full flex flex-col items-center py-6">
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="rounded-full w-32 h-32 bg-gradient-to-tr from-[#500150] via-[#42026d] to-[#031877] border-4 border-blue-100 shadow-lg overflow-hidden">
                  {user?.image ? (
                    <img
                      src={`${user?.image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold bg-indigo-800">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </motion.div>

              <h2 className="text-xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-gray-400 text-sm mb-6">{user.email}</p>

              <div className="w-full space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-[#A92EDF] text-white"
                      : "text-gray-300 hover:bg-[#1A2C5F] "
                  }`}
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    activeTab === "orders"
                      ? "bg-[#A92EDF] text-white"
                      : "text-gray-300 hover:bg-[#1A2C5F] cursor-pointer"
                  }`}
                >
                  My Orders
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4 py-6">
            {activeTab === "profile" ? (
              <ProfileSettings user={user} />
            ) : (
              <OrderHistory
                orders={orders}
                user={user}
                loading={loadingOrders}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
