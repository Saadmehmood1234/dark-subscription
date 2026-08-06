"use client";

import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Slide {
  id: number;
  bg: string;
  eyebrow: string;
  title: string;
  description: string;
  offer: string;
  imagePosition?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bg: "/netback.jpg",
    eyebrow: "Stream without limits",
    title: "Netflix Premium at a price you'll love",
    description:
      "Enjoy your favourite movies and shows in high quality with affordable Netflix subscription plans.",
    offer: "Save up to 40%",
    imagePosition: "center",
  },
  {
    id: 2,
    bg: "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
    eyebrow: "Entertainment and shopping",
    title: "Get more with Amazon Prime",
    description:
      "Access Prime Video, exclusive content and premium benefits with our limited-time membership offer.",
    offer: "First month free",
    imagePosition: "center",
  },
  {
    id: 3,
    bg: "/youpre.avif",
    eyebrow: "Watch without interruptions",
    title: "Upgrade to YouTube Premium",
    description:
      "Enjoy ad-free videos, background playback and uninterrupted entertainment across your devices.",
    offer: "60% off annual plan",
    imagePosition: "center",
  },
  {
    id: 4,
    bg: "/udem.jpg",
    eyebrow: "Learn something new",
    title: "Premium courses at affordable prices",
    description:
      "Build valuable skills with top-rated courses covering development, design, business and more.",
    offer: "Courses from ₹299",
    imagePosition: "center",
  },
  {
    id: 5,
    bg: "/spotpre.jpg",
    eyebrow: "Music made better",
    title: "Spotify Premium for less",
    description:
      "Listen to your favourite music without ads and download songs for offline playback.",
    offer: "Get 3 months free",
    imagePosition: "center",
  },
];

const Header: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const settings: Settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    dots: false,
    fade: true,
    waitForAnimate: false,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <header
      className="relative isolate w-full overflow-hidden bg-[#100719]"
      aria-label="Featured subscription offers"
    >
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          return (
            <div key={slide.id}>
              <section className="relative min-h-155 overflow-hidden sm:min-h-170 lg:min-h-190">
                <img
                  src={slide.bg}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover ${slide.imagePosition}`}
                />

                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-linear-to-r from-[#100719] via-[#100719]/85 to-[#100719]/20" />
                <div className="absolute inset-0 bg-linear-to-t from-[#100719] via-transparent to-black/20" />

                <div className="absolute -left-40 top-1/3 size-105 rounded-full bg-purple-600/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 size-90 rounded-full bg-violet-500/10 blur-[100px]" />

                <div className="relative z-10 mx-auto flex min-h-155 max-w-7xl items-center px-5 pb-32 pt-24 sm:min-h-170 sm:px-8 lg:min-h-190 lg:px-12">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {/* Offer badge */}
                          <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-300/10 px-4 py-2 text-sm font-semibold text-purple-200 backdrop-blur-md"
                          >
                            <Sparkles className="size-4" />
                            {slide.offer}
                          </motion.div>

                          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-base">
                            {slide.eyebrow}
                          </p>

                          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
                            {slide.title}
                          </h1>

                          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                            {slide.description}
                          </p>

                          {/* CTA buttons */}
                          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                              href="#products"
                              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#A92EDF] px-7 py-3.5 font-semibold text-white shadow-lg shadow-purple-950/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100719]"
                            >
                              Explore Plans
                              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                              href="#how-it-works"
                              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            >
                              How It Works
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </Slider>

      {/* Carousel navigation */}
      <div className="absolute bottom-8 left-1/2 z-30 flex w-full max-w-7xl -translate-x-1/2 items-center justify-between px-5 sm:px-8 lg:px-12">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Choose featured offer"
        >
          {slides.map((slide, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show offer ${index + 1}: ${slide.title}`}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 ${
                  isActive
                    ? "w-9 bg-purple-300"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Show previous offer"
            onClick={() => sliderRef.current?.slickPrev()}
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
          >
            <ArrowLeft className="size-5" />
          </button>

          <button
            type="button"
            aria-label="Show next offer"
            onClick={() => sliderRef.current?.slickNext()}
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;