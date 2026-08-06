"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { getProductByCategoryName } from "@/app/actions/product.actions";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import NoProductAvailable from "@/components/NoProductPage";
const CategoryPage = () => {
  const { cname } = useParams();
  const categoryName = Array.isArray(cname) ? cname[0] : cname;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [sendDetail, setSendDetail] = useState<Product | null>(null);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const res = await getProductByCategoryName(
          categoryName ? decodeURIComponent(categoryName) : ""
        );
        if (!active) return;

        if (res.success) {
          setProducts(res.data || []);
        } else {
          setProducts([]);
          if (res.status === 500) setLoadError(res.message);
        }
      } catch (error: unknown) {
        if (active) {
          setProducts([]);
          setLoadError(
            error instanceof Error ? error.message : "Unable to load products"
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchData();
    return () => {
      active = false;
    };
  }, [categoryName]);

  const handleDetail = (data: Product) => {
    setSendDetail(data);
    setIsDetailOpen(true);
  };
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (isDetailOpen && sendDetail) {
    return (
      <ProductDetail
        {...{ setIsDetailOpen, isDetailOpen, product: sendDetail }}
      />
    );
  }
  
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8">


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto max-sm:py-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20 bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Discover Trending Subscriptions
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-[#0C1B44]"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="py-20 text-center text-red-300">{loadError}</div>
        ) : filteredProducts.length === 0 ? (
          <NoProductAvailable />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-sm:gap-20 mb-12">
            {filteredProducts.map((product, index) => (
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
                  <div className="rounded-full w-32 h-32  bg-linear-to-tr from-[#500150] via-[#42026d] to-[#031877] border-8 border-blue-100 shadow-lg">
                    <img
                      src={product.logoImage}
                      alt={`${product.logoImage} Logo`}
                      className="w-full h-full  object-cover rounded-full"
                    />
                  </div>
                </motion.div>
                <div className="bg-[#0C1B44] mt-6 rounded-2xl p-6 pt-24 h-full flex flex-col border border-gray-700/50 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-xl">
                  <div className="grow">
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
        )}
      </motion.div>
    </section>
  );
};

export default CategoryPage;
