import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Review = () => {
  const testimonials = [
    {
      name: "Saad Mehmood",
      role: "Premium User",
      rating: 4.5,
      review: "Unbelievable savings! Got my Netflix subscription at 40% off. The process was seamless and instant delivery.",
    },
    {
      name: "Kamlesh",
      role: "Frequent Buyer",
      rating: 5,
      review: "Best platform for subscription deals. Customer support is top-notch and the discounts are real!",
    },
    {
      name: "Saurav Joshi",
      role: "Content Creator",
      rating: 4.8,
      review: "Saved hundreds on multiple services. Highly recommended for anyone looking to optimize their subscriptions.",
    }
  ];

  const renderStars = (rating:any) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="size-5 fill-yellow-400 text-yellow-400" />}
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center flex-col p-6 bg-linear-to-tr from-[#140214] via-[#12021d] to-[#010724]">
      <div className="flex justify-center items-center w-full my-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-2xl sm:text-3xl text-[#A92EDF] font-semibold mb-4">
              Customer Reviews
            </h2>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white mb-6">
              What Our Customers Say
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
              Don't just take our word for it - hear from thousands of satisfied users 
              who've transformed their subscription experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#0C1B44] rounded-xl p-8 hover:transform hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-linear-to-tr from-[#500150] to-[#031877] rounded-full size-12 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                {renderStars(testimonial.rating)}
                
                <p className="text-gray-300 mt-6 text-sm sm:text-base">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;