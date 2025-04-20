// components/SearchInput.tsx
"use client";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { filterProducts } from "@/app/actions/product.actions";
import { useDebounce } from "@/hooks/useDebounce";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any>();
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce the input value with 300ms delay
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        if (debouncedValue.length > 1) {
          setIsSearching(true);
          const res = await filterProducts(debouncedValue);
          console.log(res, "res");
          if (res.success && res.products) {
            setSuggestions(JSON.parse(res.products as any));
          } else {
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchFilteredProducts();
  }, [debouncedValue]);

  // Click outside handler remains the same
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search Netflix, Spotify, etc..."
          className="w-full h-10 bg-[#310557] text-white rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#A92EDF] border border-[#A92EDF]/30"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#A92EDF]"></div>
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isFocused && (suggestions.length > 0 || inputValue.length > 1) && (
        <div className="absolute mt-1 w-full bg-[#1A0C3D] border border-[#A92EDF]/30 rounded-lg shadow-lg z-50 py-2 max-h-60 overflow-auto">
          {isSearching ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#A92EDF]"></div>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product:any) => (
              <Link
                key={product._id}
                href={`/product/${product.title || product._id}`}
                className="flex items-center px-4 py-3 hover:bg-[#310557] transition-colors group"
                onClick={() => {
                  setInputValue(product.title);
                  setIsFocused(false);
                }}
              >
                <span className="text-white group-hover:text-[#A92EDF] transition-colors">
                  {product.title}
                </span>
                <span className="ml-auto text-[#A92EDF] bg-[#A92EDF]/10 px-2 py-1 rounded text-sm">
                ₹{product.price?.toFixed(2)}
                </span>
              </Link>
            ))
          ) : (
            <div className="py-4 px-4 text-gray-400 text-center">
              No products found for "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
