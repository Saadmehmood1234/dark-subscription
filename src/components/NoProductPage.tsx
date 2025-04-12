"use client";
import { motion } from "framer-motion";
import { FiFrown } from "react-icons/fi";

const NoProductAvailable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="bg-[#0C1B44] rounded-full p-6 mb-6">
        <FiFrown className="text-4xl text-purple-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
      <p className="text-gray-400 max-w-md">
        We couldn't find any products matching your criteria. Please check back
        later or try a different search.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-3 bg-[#A92EDF] cursor-pointer text-white rounded-lg font-medium flex items-center gap-2"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </motion.button>
    </motion.div>
  );
};

export default NoProductAvailable;
