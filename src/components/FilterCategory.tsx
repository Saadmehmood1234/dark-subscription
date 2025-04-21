"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/slices/searchSlice";
import { getCategory } from "@/app/actions/category.actions";

const CategoryLabels = () => {
  const [category,setCategory] = useState<any>();
  const dispatch = useDispatch()
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const res = await getCategory();
          setCategory(res.data as any);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchCategory();
    }, []);

  return (
    <div className="w-full px-2 py-4 sm:px-4 sm:py-6">
      <div className="w-full flex flex-col items-center">
        {/* Improved grid layout for small screens */}
        <div className="w-full grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
          {category && category.map((category:any, index:number) => {
        

            return (
              <motion.button
                key={category._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(setQuery(category.title.toLowerCase()))}
                className={`
                  min-w-[80px] sm:min-w-0 py-1 px-2 text-center
                  text-xs sm:text-sm font-medium
                  rounded-lg sm:rounded-xl border transition-all duration-200
                  shadow-sm hover:shadow-md`}
              >
                {category.title}
              </motion.button>
            );
          })}
        </div>

        {/* {categories.length > 5 && (
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
        )} */}
      </div>
    </div>
  );
};

export default CategoryLabels;