"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getCategory } from "@/app/actions/category.actions";
import { Types } from "mongoose";
import { Category } from "@/lib/types";

const Categories = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCategory();

        if (!active) return;

        if (!response.success) {
          setCategories([]);
          setError(response.message);
          return;
        }

        setCategories(response.data);
      } catch (error) {
        console.error("Category fetch error:", error);

        if (active) {
          setCategories([]);
          setError("Unable to load categories");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || categories.length === 0) {
      return;
    }

    // Kill any previous animation.
    animationRef.current?.kill();

    const context = gsap.context(() => {
      animationRef.current = gsap.to(slider, {
        xPercent: -50,
        duration: Math.max(categories.length * 2, 10),
        ease: "none",
        repeat: -1,
      });
    }, slider);

    const pauseAnimation = () => {
      animationRef.current?.pause();
    };

    const resumeAnimation = () => {
      animationRef.current?.resume();
    };

    slider.addEventListener("mouseenter", pauseAnimation);
    slider.addEventListener("mouseleave", resumeAnimation);

    return () => {
      slider.removeEventListener("mouseenter", pauseAnimation);
      slider.removeEventListener("mouseleave", resumeAnimation);

      animationRef.current?.kill();
      animationRef.current = null;

      context.revert();
    };
  }, [categories]);

  if (loading) {
    return (
      <section className="py-10 text-center text-white">
        Loading categories...
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-10 text-center text-gray-400">
        {error || "No categories available"}
      </section>
    );
  }

  // Render two copies for the infinite scrolling animation.
  const sliderCategories = [...categories, ...categories];

  return (
    <section className="relative overflow-hidden px-2 py-8 sm:px-4 sm:py-10">
      <h2 className="mb-6 text-center text-3xl font-bold text-white sm:mb-8 sm:text-4xl">
        Popular <span className="text-[#C27AFF]">Categories</span>
      </h2>

      <div className="relative flex w-full items-center overflow-hidden">
        <div
          ref={sliderRef}
          className="flex min-w-max gap-6 whitespace-nowrap px-2 sm:gap-8 sm:px-0 md:gap-10"
        >
          {sliderCategories.map((category, index) => (
            <Link
              href={`/category/${changeCategoryToSlug(category.title)}`}
              key={`${category.id}-${index}`}
              className="group"
            >
              <div className="flex cursor-pointer flex-col items-center gap-2 transition duration-300 hover:scale-105 active:scale-95 sm:gap-3">
                <div className="relative">
                  <img
                    src={category.logoImage}
                    alt={`${category.title} category`}
                    className="h-16 w-16 rounded-full border-2 border-gray-300 bg-white object-cover p-2 shadow-md transition-all duration-300 group-hover:border-[#C27AFF] sm:h-20 sm:w-20 md:h-24 md:w-24"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 rounded-full bg-[#C27AFF] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                </div>

                <h3 className="max-w-24 truncate text-center text-sm font-medium text-white sm:max-w-32 sm:text-lg">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

const changeCategoryToSlug = (title: string) => {
  return title
    .split(" ")
    .map((val) => val.toLowerCase())
    .join("-");
};
