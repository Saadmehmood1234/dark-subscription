"use client";
import { categories } from "@/lib/Data/categoryData";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/slices/searchSlice";

const CategoryLabels = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
    const colorPalette = [
  "bg-[#5E35B1] text-[#D1C4E9] border-[#7E57C2]",
    "bg-[#3949AB] text-[#C5CAE9] border-[#5C6BC0]",
    "bg-[#2E7D32] text-[#C8E6C9] border-[#66BB6A]",
    "bg-[#6D4C41] text-[#D7CCC8] border-[#8D6E63]",
    "bg-[#4527A0] text-[#B39DDB] border-[#9575CD]",
    "bg-[#0277BD] text-[#B3E5FC] border-[#4FC3F7]",
  ];

  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="w-full px-2 py-4 sm:px-4 sm:py-6">
      <div className="w-full flex flex-col items-center">
        {/* Improved grid layout for small screens */}
        <div className="w-full grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
          {visibleCategories.map((category, index) => {
            const colorIndex = index % colorPalette.length;
            const [bgColor, textColor, borderColor] = colorPalette[colorIndex].split(" ");

            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(setQuery(category.name.toLowerCase()))}
                className={`${bgColor} ${textColor} ${borderColor} 
                  min-w-[80px] sm:min-w-0 py-1 px-2 text-center
                  text-xs sm:text-sm font-medium
                  rounded-lg sm:rounded-xl border transition-all duration-200
                  shadow-sm hover:shadow-md`}
              >
                {category.name}
              </motion.button>
            );
          })}
        </div>

        {categories.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 px-4 py-2 bg-gray-800 text-white 
              text-sm rounded-lg hover:bg-gray-700 transition
              flex items-center gap-1"
          >
            {showAll ? (
              <>
                <span>Show Less</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                <span>Show More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryLabels;