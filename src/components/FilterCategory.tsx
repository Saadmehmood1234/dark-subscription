"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/slices/searchSlice";
import { getCategory } from "@/app/actions/category.actions";

const CategoryLabels = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F0A1F] to-[#1A1033]">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex flex-col items-center">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-lg bg-[#1E1433] animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F0A1F] to-[#1A1033]">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
          >
            Browse by Category
          </motion.h2>
          
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.05
                }}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  boxShadow: "0 8px 25px rgba(169, 46, 223, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => dispatch(setQuery(category.title.toLowerCase()))}
                className={`
                  relative group h-14 sm:h-16
                  font-medium text-sm sm:text-base
                  whitespace-nowrap overflow-hidden text-ellipsis
                  rounded-xl border border-[#3A2A5A]
                  bg-gradient-to-b from-[#251A3A] to-[#1E1433]
                  text-white hover:text-[#F0E6FF]
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-[#A92EDF] focus:ring-opacity-70
                  overflow-hidden
                `}
                aria-label={`Filter by ${category.title}`}
              >
                <span className="relative z-10">{category.title}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A92EDF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A92EDF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryLabels;