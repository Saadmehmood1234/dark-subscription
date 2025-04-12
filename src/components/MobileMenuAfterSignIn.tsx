"use client";
import { Home, ShoppingCart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const MobileMenu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-[#1F133D] shadow-lg">
      <button
        className="md:hidden text-white p-4"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      <div
        className={`md:hidden transition-all ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-[#1F133D]`}
      >
        <div className="flex flex-col items-center py-4 gap-4">
          <Link
            href="/"
            className="text-white hover:text-[#C27AFF] transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex justify-center items-center gap-2">
              {" "}
              <Home size={20} />
              <span>Home</span>
            </div>
          </Link>
          <Link
            href="/cart"
            className="text-white hover:text-[#C27AFF] transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex justify-center items-center gap-2">
              {" "}
              <ShoppingCart size={20} />
              <span>Cart</span>
            </div>
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1F133D] text-white p-4 shadow-lg flex justify-around">
        <Link href="/" className="flex flex-col items-center">
          <Home className="text-[#C27AFF]" size={24} />
          <span>Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center">
          <ShoppingCart className="text-[#C27AFF]" size={24} />
          <span>Cart</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <User className="text-[#C27AFF]" size={24} />
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileMenu;
