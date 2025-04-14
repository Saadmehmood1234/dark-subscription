"use client";

import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { getCategory } from "@/app/actions/category.actions";

type CategoryType = {
  title: string;
  logoImage: string;
};

const Category = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        setCategories(res.data || []);
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

  return (
    <div className="py-10 px-6 overflow-hidden relative">
      <h1 className="text-center font-bold text-4xl max-md:text-3xl text-white mb-8">
        Popular <span className="text-[#C27AFF]">Categories</span>
      </h1>
      <div className="w-full flex items-center overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-10 min-w-max whitespace-nowrap"
        >
          {categories.map((category, index) => (
            <Link
              href={`/category/${category.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={index}
            >
              <div className="flex flex-col items-center gap-3 cursor-pointer transform transition duration-300 hover:scale-105">
                <img
                  src={category.logoImage}
                  alt={category.title}
                  className="w-[100px] h-[100px] max-md:w-[80px] max-md:h-[80px] object-contain bg-white p-2 rounded-full border-2 border-gray-400 shadow-lg"
                />
                <h3 className="text-lg font-semibold max-sm:text-sm text-white">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
