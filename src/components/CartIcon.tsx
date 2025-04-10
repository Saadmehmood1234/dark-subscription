"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
const CartIcon = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const cartItemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="flex items-center">
      <Link href="/cart" className="relative">
        <ShoppingCart
          className="text-white cursor-pointer hover:text-[#C27AFF] transition-all"
          size={24}
        />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 left-2 bg-[#C27AFF] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/2">
            {cartItemCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;