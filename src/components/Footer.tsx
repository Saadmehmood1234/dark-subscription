"use client";
import React from "react";
import { Youtube, Instagram, Mail } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      icon: Youtube,
      url: " https://youtube.com/@primeflix-site",
      label: "YouTube",
      color: "hover:text-red-500",
      bg: "hover:bg-red-500/10",
    },
    {
      icon: FaTelegramPlane,
      url: " https://t.me/primeflix_site",
      label: "Twitter",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-400/10",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/primeflix.site",
      label: "Instagram",
      color: "hover:text-pink-500",
      bg: "hover:bg-pink-500/10",
    },
  ];

  const companyLinks = [
    { name: "About", url: "/about" },
    { name: "Contact Us", url: "/contact" },
    
  ];

  const legalLinks = [
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "Cookie Policy", url: "/cookies" },
  ];

  const supportLinks = [
    { name: "Refund Policy", url: "/refunds" },
    { name: "FAQ", url: "/#faq" }
  ];

  return (
    <footer className="w-full bg-gradient-to-tr from-[#160A25] via-[#180A25] to-[#0D0F29] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
              PrimeFlix
            </h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Your trusted source for premium digital subscriptions at wholesale
              prices. Serving over 50,000 satisfied customers since 2022.
            </p>

            {/* Follow Us - Moved here for better visual hierarchy */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3 text-sm">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className={`p-2 rounded-lg bg-[#1E1433] text-gray-400 ${social.color} ${social.bg} transition-all duration-300`}
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    aria-label={`Learn more about ${link.name}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    aria-label={`${link.name} support`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    aria-label={`View ${link.name}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1 lg:col-span-1 w-full">
            <h3 className="text-white font-semibold mb-4 text-lg">
              Join Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive deals and updates straight to your inbox
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-[#0C1B44] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A92EDF]"
                  aria-label="Email for newsletter subscription"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#A92EDF] to-purple-600 hover:from-[#8e25c9] hover:to-purple-500 text-white text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} PrimeFlix. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a
                href="/sitemap.xml"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Sitemap
              </a>
              <a
                href="/affiliates"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Affiliate Program
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">
            PrimeFlix is not affiliated with Netflix, Spotify, or other
            trademark owners. All product names, logos, and brands are property
            of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
