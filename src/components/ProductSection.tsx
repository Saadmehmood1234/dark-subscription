"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { getProduct } from "@/app/actions/product.actions";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import NoProductAvailable from "./NoProductPage";
import Loader from "./Loader";
import Link from "next/link";

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProduct();
        if (res.success) {
          setProducts(res.data || []);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <Loader />;
  }
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20 bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
          id="products"
        >
          Discover Trending Subscriptions
        </h2>

        {filteredProducts.length === 0 ? (
          <NoProductAvailable />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative pt-16 sm:pt-18"
              >
                <div className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-[#0C1B44] px-5 pb-5 pt-20 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-2xl sm:px-6 sm:pb-6 sm:pt-24">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="size-36 overflow-hidden rounded-full border-[7px] border-[#0C1B44] bg-linear-to-tr from-[#500150] via-[#42026d] to-[#031877] shadow-2xl shadow-black/40 sm:size-40 lg:size-44">
                      <img
                        src={product.logoImage}
                        alt={`${product.title} logo`}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex-1 text-center">
                      <h3 className="line-clamp-2 text-xl font-semibold text-white">
                        {product.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-white/35">Starting from</p>

                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-2xl font-semibold text-white">
                              ₹{product.price}
                            </span>

                            <span className="text-xs text-white/40">/mo</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-white/35 line-through">
                            ₹{product.originalPrice}
                          </p>

                          <span className="mt-1 inline-flex rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                            {product.discount}% off
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/products/${product.id}`}
                        aria-label={`View details for ${product.title}`}
                        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#B458EB] to-[#7657FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-950/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                      >
                        View plan
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ProductSection;
