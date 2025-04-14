"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

const FaqItem = ({ question, answer, index, isActive, onClick }: FaqItemProps) => (
  <div 
    itemScope
    itemProp="mainEntity"
    itemType="https://schema.org/Question"
    className="bg-[#0C1B44] rounded-xl p-6 transition-all duration-300 cursor-pointer hover:bg-[#12255e]"
    onClick={() => onClick(index)}
  >
    <div className="flex justify-between items-start">
      <h3 
        itemProp="name"
        className="text-lg sm:text-xl font-semibold text-white pr-4"
      >
        {question}
      </h3>
      <ChevronDown
        className={`size-6 text-[#A92EDF] transition-transform ${
          isActive ? "rotate-180" : ""
        }`}
      />
    </div>
    <div
      itemScope
      itemProp="acceptedAnswer"
      itemType="https://schema.org/Answer"
      className={`overflow-hidden transition-all duration-300 ${
        isActive ? "max-h-96 mt-4" : "max-h-0"
      }`}
    >
      <div itemProp="text" className="text-gray-400 text-base sm:text-lg">
        {answer}
      </div>
    </div>
  </div>
);

export default FaqItem;