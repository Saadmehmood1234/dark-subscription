"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CategoryLabels = () => {
  // Dummy category data
  const categories = [
    { id: "1", name: "Electronics", slug: "electronics" },
    { id: "2", name: "Subscriptions", slug: "subscriptions" },
    { id: "3", name: "Premium", slug: "premium" },
    { id: "4", name: "Limited", slug: "limited" },
    { id: "5", name: "Gaming", slug: "gaming" },
    { id: "6", name: "Software", slug: "software" },
  ];

  // Theme-appropriate color palette
  const colorPalette = [
    "bg-[#5E35B1] text-[#D1C4E9] border-[#7E57C2]", // Deep purple
    "bg-[#3949AB] text-[#C5CAE9] border-[#5C6BC0]", // Indigo
    "bg-[#2E7D32] text-[#C8E6C9] border-[#66BB6A]", // Emerald
    "bg-[#6D4C41] text-[#D7CCC8] border-[#8D6E63]", // Brown
    "bg-[#4527A0] text-[#B39DDB] border-[#9575CD]", // Deep violet
    "bg-[#0277BD] text-[#B3E5FC] border-[#4FC3F7]", // Dark blue
  ];

  return (
    <div className="w-full flex justify-center flex-wrap gap-3 px-4 py-6">
      {categories.map((category, index) => {
        const colorIndex = index % colorPalette.length;
        const [bgColor, textColor, borderColor] = colorPalette[colorIndex].split(' ');

        return (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${bgColor} ${textColor} ${borderColor} rounded-3xl border-2 transition-all duration-300`}
          >
            <Link
              href={`/categories/${category.slug}`}
              className="block px-6 py-2 text-lg font-medium whitespace-nowrap"
            >
              {category.name}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoryLabels;