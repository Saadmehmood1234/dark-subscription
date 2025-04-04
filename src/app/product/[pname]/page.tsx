"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { KeyRound, Monitor, Users, Smartphone } from "lucide-react";
const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const product = {
    id: 1,
    name: "Netflix Premium Account",
    price: "₹299",
    description:
      "Get access to unlimited movies & shows with a Netflix Premium account at a discounted price.",
    features: [
      "4K Ultra HD Streaming",
      "No Ads, Unlimited Viewing",
      "Supports 4 Screens at Once",
      "Instant Delivery After Purchase",
    ],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
      "https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-2006.png",
    ],
  };

  const addToCart = () => {
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 xl:gap-12 bg-[#0C1B44] backdrop-blur-sm rounded-3xl p-8 border border-[#A92EDF]/20 shadow-2xl"
        >
          <div className="lg:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] p-4"
            >
              <motion.img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[400px] object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
                {product.images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-8 rounded-full transition-all duration-300 ${
                      selectedImage === index
                        ? "bg-[#A92EDF]"
                        : "bg-gray-600/50"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </motion.div>

            <div className="mt-6 flex space-x-4 overflow-x-auto pb-4">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 m-2"
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`h-20 w-20 object-contain rounded-xl border-2 transition-all ${
                      selectedImage === index
                        ? "border-[#A92EDF] scale-110"
                        : "border-transparent opacity-70"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8 bg-[#0C1B44]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#A92EDF] to-[#A92EDF] bg-clip-text text-transparent">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center space-x-4">
                <div className="text-3xl font-bold text-white">
                  {product.price}
                </div>
                <span className="text-gray-400 line-through">₹599/month</span>
                <span className="text-green-400 font-semibold">50% OFF</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center p-4 bg-[#0C1B44] rounded-xl hover:bg-[#0C1B44]/80 transition-all"
                  >
                    <CheckCircle className="text-[#A92EDF] mr-3" size={24} />
                    <span className="text-gray-200 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2"
                  onClick={addToCart}
                >
                  <ShoppingCart className="text-white" size={24} />
                  <span>Buy Now</span>
                </motion.button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="text-green-400" size={20} />
                  <span>7-Day Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="text-yellow-400" size={20} />
                  <span>Instant Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid gap-6 text-white"
        >
          <div className="p-6 bg-[#0C1B44] rounded-2xl border border-[#A92EDF]/20">
            <h3 className="text-xl font-bold mb-4 text-[#A92EDF]">Features</h3>
            <ul className="space-y-3 flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-between items-center">
              <li className="flex items-center space-x-2 w-full sm:w-auto">
                <KeyRound className="text-[#A92EDF]" size={20} />
                <span>Premium Account Access</span>
              </li>
              <li className="flex items-center space-x-2 w-full sm:w-auto">
                <Monitor className="text-[#A92EDF]" size={20} />
                <span>4K/HDR Support</span>
              </li>
              <li className="flex items-center space-x-2 w-full sm:w-auto">
                <Users className="text-[#A92EDF]" size={20} />
                <span>Multiple Profiles</span>
              </li>
              <li className="flex items-center space-x-2 w-full sm:w-auto">
                <Smartphone className="text-[#A92EDF]" size={20} />
                <span>Mobile & TV Access</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
