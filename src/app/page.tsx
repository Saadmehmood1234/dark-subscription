import Category from "@/components/Category";
import Chatbot from "@/components/ChatBot";
import Faq from "@/components/faq/Faq";
import Featers from "@/components/Featers";
import CategoryLabels from "@/components/FilterCategory";
import FloatWhatsapp from "@/components/FloatWatsapp";
import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import Review from "@/components/Review";
import React from "react";
const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-linear-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] text-white">
      <Header />

      <Category />
      <CategoryLabels />
      <ProductSection />
      <Featers />
      <Review />
      <Faq />

      <FloatWhatsapp />
      <Chatbot />
    </div>
  );
};

export default Home;
