"use client";

import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { getGroup } from "@/app/actions/category.actions";

type CategoryType = {
  title: string;
  logoImage: string;
};

const Category = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getGroup();
        setCategories(res.data || []);
        console.log("Data", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || categories.length === 0) return;

    const slider = sliderRef.current;
    const items = Array.from(slider.children) as HTMLElement[];
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth + 40;
    const totalWidth = itemWidth * categories.length;
    const clones = items.map((item) => item.cloneNode(true) as HTMLElement);
    clones.forEach((clone) => slider.appendChild(clone));

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    tl.to(slider, {
      x: -totalWidth,
      duration: categories.length * 1.5,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    const sliderContainer = slider.parentElement;
    if (sliderContainer) {
      const pause = () => gsap.to(tl, { timeScale: 0 });
      const play = () => gsap.to(tl, { timeScale: 1 });

      sliderContainer.addEventListener("mouseenter", pause);
      sliderContainer.addEventListener("mouseleave", play);

      return () => {
        tl.kill();
        sliderContainer.removeEventListener("mouseenter", pause);
        sliderContainer.removeEventListener("mouseleave", play);
      };
    }

    return () => tl.kill();
  }, [categories]);
  console.log("Images", categories);
  return (
    <div className="py-8 sm:py-10 px-2 sm:px-4 overflow-hidden relative">
      <h1 className="text-center font-bold text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
        Popular <span className="text-[#C27AFF]">Categories</span>
      </h1>

      <div className="w-full flex items-center overflow-hidden relative">
        {/* <button 
          onClick={slideLeft} 
          className="hidden md:block absolute left-0 z-10 bg-gray-800/80 hover:bg-gray-700/90 text-white p-2 rounded-full ml-2"
          aria-label="Previous categories"
        >
          &lt;
        </button> */}

        <div
          ref={sliderRef}
          className="flex gap-6 sm:gap-8 md:gap-10 min-w-max whitespace-nowrap px-2 sm:px-0"
        >
          {categories.map((category, index) => (
            <Link
              href={`/category/${category.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={index}
              className="group"
            >
              <div className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer transform transition duration-300 hover:scale-105 active:scale-95">
                <div className="relative">
                  <img
                    src={`${category?.logoImage}`}
                    alt={category.title}
                    className="w-16 h-16 xs:w-[70px] xs:h-[70px] sm:w-20 sm:h-20 md:w-[100px] md:h-[100px] object-cover bg-white p-2 rounded-full border-2 border-gray-300 group-hover:border-[#C27AFF] shadow-md transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#C27AFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-sm xs:text-base sm:text-lg font-medium text-white text-center max-w-[90px] xs:max-w-[100px] sm:max-w-none truncate">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* <button 
          onClick={slideRight} 
          className="hidden md:block absolute right-0 z-10 bg-gray-800/80 hover:bg-gray-700/90 text-white p-2 rounded-full mr-2"
          aria-label="Next categories"
        >
          &gt;
        </button> */}
      </div>

      <div className="md:hidden flex justify-center gap-2 mt-4">
        {categories.length > 5 && (
          <>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
