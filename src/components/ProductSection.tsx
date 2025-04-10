"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import ProductDetail from "./ProductDetail";
import { getProduct } from "@/app/actions/product.actions";
import { FiArrowRight } from "react-icons/fi";

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [sendDetail, setSendDetail] = useState<Product | null>(null);
  const [status, setStatus] = useState({ message: "", error: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProduct();
        if (!res.success) {
          setStatus({
            error: res.message || "Error fetching data",
            message: "",
          });
        } else {
          setStatus({ message: res.message || "Success", error: "" });
          setProducts(res.data || []);
        }
      } catch (error: any) {
        setStatus({
          error: error.message || "Error fetching data",
          message: "",
        });
      }
      setTimeout(() => setStatus({ message: "", error: "" }), 2000);
    };
    fetchData();
  }, []);

  const handleDetail = (data: Product) => {
    setSendDetail(data);
    setIsDetailOpen(true);
  };

  if (isDetailOpen && sendDetail) {
    return (
      <ProductDetail
        {...{ setIsDetailOpen, isDetailOpen, product: sendDetail }}
      />
    );
  }

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md z-50"
        >
          {status.message}
        </motion.div>
      )}
      {status.error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-4 py-2 rounded-md shadow-md z-50"
        >
          {status.error}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Discover Trending Subscriptions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-sm:gap-20 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="rounded-full w-32 h-32  bg-gradient-to-tr from-[#500150] via-[#42026d] to-[#031877] border-8 border-blue-100 shadow-lg">
                  <img
                    src={product.logoImage}
                    alt={`${product.logoImage} Logo`}
                    className="w-full h-full  object-cover rounded-full"
                  />
                </div>
              </motion.div>
              <div className="bg-[#0C1B44] mt-6 rounded-2xl p-6 pt-24 h-full flex flex-col border border-gray-700/50 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-xl">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-5 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    </div>
                    <span className="text-white font-semibold">
                      ₹{product.price}/mo
                    </span>
                  </div>
                  <motion.button
                    onClick={() => handleDetail(product)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-medium py-3 px-6 rounded-lg transition-all"
                  >
                    Purchase Now{" "}
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductSection;
