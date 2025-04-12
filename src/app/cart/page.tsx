"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchCart, removeFromCart, addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import CheckoutModal from "@/components/CheckoutModalForCart";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, status, error } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>(
    {}
  );
  const [localQuantities, setLocalQuantities] = useState<
    Record<string, number>
  >({});
  const [showCheckout, setShowCheckout] = useState(false);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    cart.items.forEach((item) => {
      initialQuantities[item.product._id] = item.quantity;
    });
    setLocalQuantities(initialQuantities);
  }, [cart]);

  const handleRemoveFromCart = async (productId: string) => {
    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      await dispatch(removeFromCart(productId)).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleUpdateQuantity = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    const item = cart.items.find((i) => i.product._id === productId);
    if (!item) return;
    setLocalQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      await dispatch(
        addToCart({
          product: productId,
          quantity: newQuantity,
          price: item.price / item.quantity,
          subscriptionPlan: item.subscriptionPlan,
        })
      ).unwrap();
    } catch (error) {
      setLocalQuantities((prev) => ({ ...prev, [productId]: item.quantity }));
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const getUniqueCartItems = () => {
    const uniqueItemsMap = new Map<string, (typeof cart.items)[0]>();
    cart.items.forEach((item) => {
      const key = `${item.product._id}-${item.subscriptionPlan || "none"}`;
      if (!uniqueItemsMap.has(key)) {
        uniqueItemsMap.set(key, item);
      }
    });
    return Array.from(uniqueItemsMap.values());
  };
  console.log("Test data", cart.items);
  const uniqueCartItems = getUniqueCartItems();

  // if (status === "loading") return <p className="text-center py-12">Loading...</p>;
  if (status === "failed")
    return <p className="text-center py-12 text-red-500">Error: {error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="m-6 sm:m-8 md:m-10 lg:m-12 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] rounded-3xl border-2 border-[#A92EDF]/30 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <ShoppingCart className="text-[#C27AFF]" size={24} />
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#C27AFF] to-[#A05BD3] bg-clip-text text-transparent">
          Your Shopping Cart
        </h3>
      </div>

      <AnimatePresence>
        {uniqueCartItems.length > 0 ? (
          <>
            <ul className="space-y-4 mb-6 sm:mb-8">
              {uniqueCartItems.map((item) => {
                const quantity =
                  localQuantities[item.product._id] ?? item.quantity;
                return (
                  <motion.li
                    key={`${item.product._id}-${
                      item.subscriptionPlan || "none"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group bg-[#0C1B44]/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-[#A92EDF]/20 hover:border-[#C27AFF]/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="flex-1">
                        <h4 className="font-medium text-base sm:text-lg">
                          {item.product?.title || "Unnamed Product"}
                        </h4>
                        <p className="text-[#C27AFF] text-sm">
                          ₹{(item.price / item.quantity).toFixed(2)}
                          {item.subscriptionPlan
                            ? `/${item.subscriptionPlan}`
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
                        <div className="flex items-center gap-2 bg-[#0C1B44] rounded-full p-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product._id,
                                quantity - 1
                              )
                            }
                            className="p-1.5 rounded-full hover:bg-[#A92EDF]/20 transition-colors"
                            disabled={updatingItems[item.product._id]}
                          >
                            {updatingItems[item.product._id] ? (
                              <div className="h-4 w-4 border-2 border-[#C27AFF]/30 border-t-[#C27AFF] rounded-full animate-spin" />
                            ) : (
                              <Minus className="text-[#C27AFF] w-4 h-4" />
                            )}
                          </button>
                          <span className="w-6 text-center">{quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product._id,
                                quantity + 1
                              )
                            }
                            className="p-1.5 rounded-full hover:bg-[#A92EDF]/20 transition-colors"
                            disabled={updatingItems[item.product._id]}
                          >
                            {updatingItems[item.product._id] ? (
                              <div className="h-4 w-4 border-2 border-[#C27AFF]/30 border-t-[#C27AFF] rounded-full animate-spin" />
                            ) : (
                              <Plus className="text-[#C27AFF] w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="w-20 sm:w-24 text-right">
                          <span className="text-[#C27AFF] font-medium">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.product._id)}
                          className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
                          disabled={updatingItems[item.product._id]}
                        >
                          {updatingItems[item.product._id] ? (
                            <div className="h-4 w-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                          ) : (
                            <Trash2
                              className="text-red-400 hover:text-red-300"
                              size={18}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            <CheckoutModal
              cartItems={cart.items}
              isOpen={showCheckout}
              onClose={() => setShowCheckout(false)}
            />
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold">Total:</div>
              <div className="text-xl font-bold text-[#C27AFF]">
                ₹{cart.totalPrice.toFixed(2)}
              </div>
            </div>

            <motion.button
              onClick={() => setShowCheckout(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full cursor-pointer bg-[#A92EDF] hover:bg-[#8e5ea3] py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Secure Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <div className="mb-4 sm:mb-6 text-[#C27AFF]">
              <ShoppingCart className="mx-auto" size={40} />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">
              Your cart is empty
            </h4>
            <p className="text-gray-400 mb-4 sm:mb-6">
              Explore our services and find something special!
            </p>
            <Link href={"/"}>
              <button className="bg-gradient-to-r from-[#C27AFF] to-[#7B61FF] px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:opacity-90 transition-opacity">
                Browse Services
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
