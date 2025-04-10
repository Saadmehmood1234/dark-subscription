"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { orderProduct } from "@/app/actions/order.actions";

const CheckoutModal = ({ cartItems, isOpen, onClose }: any) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const total = cartItems.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;
  const handleOrder = async () => {
    const res = await orderProduct(cartItems, paymentMethod);
    alert("Integrate payment gateway here");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
    >
      <motion.div className="relative max-w-2xl w-full mx-auto p-6 sm:p-8 bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] rounded-3xl border-2 border-[#A92EDF]/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition"
        >
          <X className="w-6 cursor-pointer h-6" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A92EDF] to-[#A92EDF] bg-clip-text text-transparent">
            Complete Checkout
          </h2>
          <p className="text-gray-400 mt-2">
            Review your order and make payment
          </p>
        </div>
        {cartItems.map((item: any, index: number) => (
          <motion.div
            key={item.id || `${item.product.name}-${index}`}
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between border-b border-[#A92EDF]/30 pb-3"
          >
            <div className="flex items-center mt-2 gap-4">
              <img
                src={item.product.images}
                alt={item.product.title}
                className="w-12 h-12 object-cover rounded-lg border border-[#A92EDF]/30"
              />
              <div>
                <p className="font-semibold text-sm text-gray-200">
                  {item.product.title}
                </p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-[#C27AFF]">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </motion.div>
        ))}

        <div className="flex justify-between items-center py-4 border-t border-b border-[#A92EDF]/30">
          <span className="text-lg font-semibold text-gray-300">Total</span>
          <span className="text-xl font-bold text-[#A92EDF]">
            ${total.toFixed(2)}
          </span>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-3 text-gray-300">
            Select Payment Method
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 bg-[#0C1B44] p-3 rounded-lg border border-[#A92EDF]/30 hover:border-[#C27AFF] transition cursor-pointer">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#A92EDF]"
              />
              <span className="text-gray-300">Card</span>
            </label>
            <label className="flex items-center gap-2 bg-[#0C1B44] p-3 rounded-lg border border-[#A92EDF]/30 hover:border-[#C27AFF] transition cursor-pointer">
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#A92EDF]"
              />
              <span className="text-gray-300">UPI</span>
            </label>
            <label className="flex items-center gap-2 bg-[#0C1B44] p-3 rounded-lg border border-[#A92EDF]/30 hover:border-[#C27AFF] transition cursor-pointer">
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#A92EDF]"
              />
              <span className="text-gray-300">Wallet</span>
            </label>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOrder}
          className="w-full mt-6 bg-[#A92EDF] hover:bg-[#8e5ea3] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          Pay Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutModal;
