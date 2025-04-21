// "use client";
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Header = () => {
//   const slides = [
//     { id: 1, img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg", text: "Get Netflix Premium at the Lowest Price!" },
//     { id: 2, img: "https://m.media-amazon.com/images/G/01/digital/video/acquisition/weblanding/prime/hero/PrimeVideo_Logo.png", text: "Amazon Prime Membership - Limited Offer!" },
//     { id: 3, img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png", text: "YouTube Premium at Unbeatable Prices!" },
//     { id: 4, img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg", text: "Top Udemy & Coursera Courses at Huge Discounts!" },
//     { id: 5, img: "https://www.scdn.co/i/_global/open-graph-default.png", text: "Spotify Premium for Less - Enjoy Unlimited Music!" },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//   };

//   return (
//     <header className="relative w-full mt-10">
//       <Slider {...settings} className="md:w-[85vw] w-[95vw] mx-auto rounded-2xl">
//         {slides.map((slide) => (
//           <div key={slide.id} className="relative h-[380px] md:h-[450px] rounded-2xl overflow-hidden">
//             <img
//               src={slide.img}
//               alt="Product Offer"
//               className="w-full h-full object-contain bg-white p-6 transition-transform duration-500 hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
//               <h1 className="text-2xl md:text-4xl font-extrabold">{slide.text}</h1>
//               <button className="mt-4 px-6 py-3 bg-[#C027FF] text-white font-semibold rounded-md shadow-md hover:bg-[#A020F0] transition-transform transform hover:scale-105">
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </header>
//   );
// };

// export default Header;
"use client";
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Slide {
  id: number;
  bg: string;
  text: string;
  offer: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bg: "/netback.jpg",
    text: "Get Netflix Premium at the Lowest Price!",
    offer: "Save up to 40%",
  },
  {
    id: 2,
    bg: "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
    text: "Amazon Prime Membership - Limited Offer!",
    offer: "First Month Free",
  },
  {
    id: 3,
    bg: "/youpre.avif",
    text: "YouTube Premium at Unbeatable Prices!",
    offer: "60% Off Annual Plan",
  },
  {
    id: 4,
    bg: "/udem.jpg",
    text: "Top Courses at Huge Discounts!",
    offer: "Courses from ₹299",
  },
  {
    id: 5,
    bg: "/spotpre.jpg",
    text: "Spotify Premium for Less!",
    offer: "3 Months Free",
  },
];

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  fade: true,
  appendDots: (dots) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <ul className="flex space-x-2">{dots}</ul>
    </div>
  ),
  customPaging: () => (
    <div className="w-3 h-3 bg-white/30 rounded-full transition-all hover:bg-white/50" />
  ),
};

const Header: React.FC = () => {
  return (
    <header className="relative w-full">
      <Slider {...settings} className="overflow-hidden">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[70vh] xl:h-[80vh]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#160A25] via-[#160A25]/70 to-transparent z-10" />
            <img
              src={slide.bg}
              alt="Offer"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-24 text-center"
            >
              <div className="max-w-4xl mx-auto">
                <span className="inline-block mb-4 px-4 py-2 bg-[#C27AFF]/10 text-[#C27AFF] rounded-full text-sm font-semibold">
                  {slide.offer}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#C27AFF] to-[#7B61FF] bg-clip-text text-transparent">
                  {slide.text}
                </h1>
                <Link href="#products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#C27AFF] to-[#7B61FF] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                >
                  Purchase Now
                  <ArrowRight className="size-5" />
                </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </header>
  );
};

export default Header;
