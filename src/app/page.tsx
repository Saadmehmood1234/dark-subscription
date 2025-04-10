import Category from '@/components/Category'
import Faq from '@/components/Faq'
import Featers from '@/components/Featers'
import CategoryLabels from '@/components/FilterCategory'
import FloatWhatsapp from '@/components/FloatWatsapp'
import Header from '@/components/Header'
import ProductSection from '@/components/ProductSection'
import Review from '@/components/Review'
import React from 'react'

const Home = () => {
  return (
    <div className='text-white flex flex-col flex-1  bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] w-full h-full'>
      <Header />
      <Category />
      <CategoryLabels/>
      <ProductSection />
      <Featers />
      <FloatWhatsapp/>
      <Review />
      <Faq />
    </div>
  )
}

export default Home

