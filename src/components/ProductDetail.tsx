"use client";
import React, { useState, useRef,useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  CheckCircle,
  ShieldCheck,
  Zap,
  X,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { KeyRound, Monitor, Users, Smartphone } from "lucide-react";
import { Product } from "@/lib/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { AppDispatch } from "@/lib/store";
import toast from "react-hot-toast";

type ProductDetailPropType = {
  setIsDetailOpen: (value: boolean) => void;
  isDetailOpen: boolean;
  product: Product | null;
};

const ProductDetail = ({
  setIsDetailOpen,
  isDetailOpen,
  product,
}: ProductDetailPropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [subscriptionPlan, setSubscriptionPlan] = useState<
    "monthly" | "yearly"
  >("monthly");
  const posRef = useRef<HTMLDivElement>(null);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        No product details available.
      </div>
    );
  }
  useEffect(() => {
    if (isDetailOpen) {
      setSelectedImage(0);
      // Scroll into view or focus
      posRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDetailOpen]);
  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    const toastId = toast.loading("Adding to cart...");

    try {
      await dispatch(
        addToCart({
          product: product.id,
          quantity: quantity,
          price: product.price,
          subscriptionPlan: subscriptionPlan,
        })
      ).unwrap();

      toast.success(`${quantity} ${product.title} added to cart!`, {
        id: toastId,
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#0C1B44",
          color: "#fff",
          border: "1px solid #A92EDF",
        },
      });
    } catch (error: any) {
      toast.error(error || "Failed to add product to cart", {
        id: toastId,
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#0C1B44",
          color: "#fff",
          border: "1px solid #ff4d4f",
        },
      });
      console.error("Add to cart error:", error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-6 xl:gap-8 bg-[#0C1B44] backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 border border-[#A92EDF]/20 shadow-2xl"
        >
          <X
            onClick={() => setIsDetailOpen(!isDetailOpen)}
            size={24}
            className="hover:text-[#A92EDF]  cursor-pointer lg:hidden absolute right-4 top-2 z-10"
          />
          <div ref={posRef} className="lg:w-1/2 lg:pr-4 p-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div  className="aspect-w-1 aspect-h-1 w-full">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-auto max-h-[400px] object-contain p-2"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-6 sm:w-8 rounded-full transition-all duration-300 ${
                      selectedImage === index
                        ? "bg-[#A92EDF]"
                        : "bg-gray-600/50"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </motion.div>
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 px-1">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className={`h-16 w-16 m-1 sm:h-20 sm:w-20 object-contain rounded-lg border transition-all ${
                      selectedImage === index
                        ? "border-[#A92EDF] scale-105"
                        : "border-transparent opacity-70"
                    }`}
                    unoptimized
                  />
                </motion.button>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#A92EDF] to-[#A92EDF] bg-clip-text text-transparent">
                  {product.title}
                </h1>
                <X
                  onClick={() => setIsDetailOpen(!isDetailOpen)}
                  size={24}
                  className="hover:text-[#A92EDF] cursor-pointer hidden lg:block"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  ₹{product.price}
                </div>
                <span className="text-gray-400 line-through text-sm sm:text-base">
                  ₹599/month
                </span>
                <span className="text-green-400 font-semibold text-sm sm:text-base">
                  50% OFF
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>
              <div className="space-y-2">
                {product.features[0]
                  ?.split("\n")
                  .filter((feature) => feature.trim() !== "")
                  .map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start py-2 bg-[#0C1B44] rounded-lg hover:bg-[#0C1B44]/80 transition-all"
                    >
                      <CheckCircle
                        className="text-[#A92EDF] mr-2 mt-0.5 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-200 text-sm sm:text-base font-medium">
                        {feature.trim()}
                      </span>
                    </motion.div>
                  ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between w-full ">
                <Link
                  href={"/payment"}
                  className="w-full bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center space-x-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#A92EDF] cursor-pointer hover:bg-[#8e5ea3] text-white font-bold rounded-xl flex items-center justify-center space-x-2"
                    // onClick={}
                  >
                    <ShoppingBag className="text-white" size={20} />
                    <span>Buy Now</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full cursor-pointer bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center space-x-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="text-white" size={20} />
                  <span>Add To Cart</span>
                </motion.button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-400 text-sm sm:text-base">
                <div className="flex  items-center space-x-1 sm:space-x-2">
                  <ShieldCheck className="text-green-400" size={18} />
                  <span>7-Day Warranty</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Zap className="text-yellow-400" size={18} />
                  <span>Instant Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <div className="p-4 sm:p-6 bg-[#0C1B44] rounded-2xl border border-[#A92EDF]/20">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#A92EDF]">
              Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <KeyRound className="text-[#A92EDF]" size={18} />
                <span>Premium Account Access</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <Monitor className="text-[#A92EDF]" size={18} />
                <span>4K/HDR Support</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <Users className="text-[#A92EDF]" size={18} />
                <span>Multiple Profiles</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <Smartphone className="text-[#A92EDF]" size={18} />
                <span>Mobile & TV Access</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
