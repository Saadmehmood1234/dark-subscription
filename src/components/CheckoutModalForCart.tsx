"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { orderProduct } from "@/app/actions/stripe.actions";
import { loadStripe } from "@stripe/stripe-js";
import Script from "next/script";
import { createRazorpayOrder } from "@/app/actions/razorpay.action";

const CheckoutModal = ({ cartItems, isOpen, onClose }: any) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const total = cartItems.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      if (paymentMethod === "card") {
        // Stripe payment flow
        const orderResult: any = await orderProduct(cartItems, paymentMethod);

        if (!orderResult.success || !orderResult.id) {
          throw new Error(orderResult.message);
        }

        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );

        if (!stripe) throw new Error("Stripe failed to initialize");
        
        const sessionResponse = await fetch(
          `/api/get-session?orderId=${orderResult.id}`
        );
        const { sessionId } = await sessionResponse.json();

        if (!sessionId) throw new Error("Missing session ID");

        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) throw error;
      } else {
        // Razorpay payment flow for UPI/wallet
        const result = await createRazorpayOrder(total);
        
        if (!result.success || !result.order?.id) {
          throw new Error(result.error || "Failed to create Razorpay order");
        }

        const order = result.order;
        
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: order.amount,
          currency: order.currency,
          name: "Your Company Name",
          description: "Payment for your product/service",
          image: "/logo.png",
          order_id: order.id,
          handler: async function(response: any) {
            console.log("Razorpay payment successful:", response);
            // Handle successful payment (you might want to verify on your server)
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            onClose();
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
          method: paymentMethod === "upi" ? "upi" : "wallet",
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script 
        id="razorpay-checkout-js" 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
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

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200"
            >
              {error}
            </motion.div>
          )}

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
              ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </motion.div>
          ))}

          <div className="flex justify-between items-center py-4 border-t border-b border-[#A92EDF]/30">
            <span className="text-lg font-semibold text-gray-300">Total</span>
            <span className="text-xl font-bold text-[#A92EDF]">
            ₹{total.toFixed(2)}
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
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full mt-6 bg-[#A92EDF] hover:bg-[#8e5ea3] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CheckoutModal;