import React from 'react'

const Loader = () => {
  return (
    <div className="bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] min-h-screen p-8">
    {/* Product Image Skeleton */}
    <div className="mx-auto max-w-2xl">
      <div className="h-64 bg-[#0C1B44] rounded-xl mb-6 animate-pulse"></div>
      
      {/* Title Skeleton */}
      <div className="h-8 bg-[#0C1B44] rounded-full w-3/4 mb-4 animate-pulse"></div>
      
      {/* Price Skeleton */}
      <div className="h-6 bg-[#0C1B44] rounded-full w-1/4 mb-6 animate-pulse"></div>
      
      {/* Description Skeletons */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-[#0C1B44] rounded-full w-full animate-pulse"></div>
        <div className="h-4 bg-[#0C1B44] rounded-full w-5/6 animate-pulse"></div>
        <div className="h-4 bg-[#0C1B44] rounded-full w-4/6 animate-pulse"></div>
        <div className="h-4 bg-[#0C1B44] rounded-full w-3/6 animate-pulse"></div>
      </div>
      
      {/* CTA Button Skeleton */}
      <div className="h-12 bg-gradient-to-r from-[#500150] to-[#031877] rounded-xl w-full animate-pulse"></div>
    </div>
  </div>
  )
}

export default Loader