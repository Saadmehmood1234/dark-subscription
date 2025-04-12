// components/Navbar.tsx
"use client";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/slices/searchSlice";

const SearchInput = () => {
  const dispatch = useDispatch();

  return (
    <div className="hidden md:flex items-center relative w-[400px]">
      <Search className="absolute left-3 text-gray-400" size={20} />
      <input
        type="text"
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Tinder, Amazon Prime, etc.."
        className="w-full h-10 bg-[#310557] text-white rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#A92EDF]"
      />
    </div>
  );
};

export default SearchInput;
