"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Github,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col p-6 bg-gradient-to-tr from-[#160A25] via-[#180A25] to-[#0D0F29] border-t border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
              DarkSale
            </h2>
            <p className="text-gray-400 mt-4 text-sm">
              Your gateway to premium subscriptions at unmatched prices.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-6 md:mt-0">
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {["About", "Blog", "Partners"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-pink-500 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 md:mt-0">
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {["Privacy", "Terms", "Security"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Youtube, color: "hover:text-red-500" },
                { icon: Twitter, color: "hover:text-blue-500" },
                { icon: Instagram, color: "hover:text-pink-500" },
                // { icon: Github, color: "hover:text-gray-300" },
              ].map((SocialIcon, index) => (
                <SocialIcon.icon
                  key={index}
                  className={`size-5 text-gray-400 cursor-pointer transition-colors ${SocialIcon.color}`}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1 mt-6 md:mt-0">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#0C1B44] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A92EDF]"
              />
              <button className="bg-[#A92EDF] hover:bg-[#8e5ea3] text-white text-sm font-semibold py-3 px-6 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-gray-400 text-sm text-center">
            © 2025 DarkSale. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
