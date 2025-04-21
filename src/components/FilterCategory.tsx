"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/slices/searchSlice";
import { getCategory } from "@/app/actions/category.actions";

const CategoryLabels = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategory();
  }, []);

  if (!categories.length) {
    return null;
  }

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:flex xl:flex-wrap xl:justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category._id}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 14px rgba(169, 46, 223, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => dispatch(setQuery(category.title.toLowerCase()))}
                className={`
                  flex-1 min-w-[100px] max-w-[180px] py-2 px-3
                  text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis
                  rounded-lg border border-[#2A1E3A]
                  bg-[#1E1433] hover:bg-[#2A1E3A]
                  text-[#B4ACD9] hover:text-white
                  transition-all duration-200
                  shadow-sm hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-[#A92EDF] focus:ring-opacity-50
                `}
                aria-label={`Filter by ${category.title}`}
              >
                {category.title}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryLabels;
