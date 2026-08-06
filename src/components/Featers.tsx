import React from "react";
import { UserRound, ShoppingCart, Package } from "lucide-react";
import { ShieldCheck, BadgeCheck, Tags, ArrowRight } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Transactions",
      description:
        "All payments are encrypted with 256-bit SSL protection. Your data is never stored or shared with third parties.",
      color: "from-[#500150] via-[#42026d] to-[#031877]",
    },
    {
      icon: BadgeCheck,
      title: "Verified Accounts",
      description: "Every subscription is manually checked for validity before delivery. 100% genuine access guaranteed.",
      color: "from-[#03464d] via-[#025d42] to-[#024d6d]",
    },
    {
      icon: Tags,
      title: "Unbeatable Prices",
      description:
        "Save 60-80% compared to official prices. We negotiate bulk discounts directly with providers.",
      color: "from-[#5d0101] via-[#6d0242] to-[#4d026d]",
    },
  ];

  const steps = [
    {
      icon: UserRound,
      title: "Create Account",
      description: "Sign up in 30 seconds to access exclusive member pricing."
    },
    {
      icon: ShoppingCart,
      title: "Choose Subscription",
      description: "Select from Netflix, Prime Video, Spotify, and 20+ other services."
    },
    {
      icon: Package,
      title: "Instant Delivery",
      description: "Receive login credentials immediately after payment confirmation."
    }
  ];

  return (
    <section id="how-it-works" className="w-full overflow-x-hidden flex justify-center items-center flex-col bg-linear-to-tr from-[#160A25] via-[#180A25] to-[#0D0F29] pt-12 px-2 sm:px-4">
  
    <div className="flex mx-1 justify-center items-center flex-col w-full">
      <div className="max-w-4xl text-center w-full px-2">
        <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl mb-8">
          Get Premium Accounts in 3 Easy Steps
        </h1>
        <p className="text-xl font-mono text-gray-500">
          Join 50,000+ satisfied customers who enjoy premium services at wholesale prices. 
          Our process takes less than 2 minutes from start to finish.
        </p>
      </div>
  
      <div className="relative flex flex-wrap justify-center items-center my-12 gap-8 w-full px-2">
        {/* <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 hidden md:block"></div>
         */}
        {steps.map((step, index) => (
          <div key={index} className="relative group text-center w-52 sm:w-64">
            <div className="relative w-32 h-32 max-lg:w-24 max-lg:h-24 max-md:w-20 max-md:h-20 max-sm:w-16 max-sm:h-16 bg-linear-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full flex justify-center items-center z-10 transition-transform duration-300 group-hover:scale-110 mx-auto">
              <step.icon className="text-white size-12 max-lg:size-10 max-md:size-8 max-sm:size-6" />
            </div>
            <div className="mt-4 w-full">
              <h3 className="text-white text-2xl max-sm:text-xl  font-semibold">{step.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-center items-center w-full my-10 max-md:my-4 mt-12 px-2">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 xl:gap-12">
          <div className="flex flex-col gap-4 lg:gap-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl text-[#A92EDF] font-semibold">
              Why Customers Choose Us
            </h2>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white">
              The Safe & Smart Way to Buy Premium Accounts
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl lg:pr-8 mx-auto lg:mx-0">
              Since 2020, we've helped over 50,000 users access premium services 
              at prices they can actually afford. Here's what makes us different:
            </p>
          </div>
  
          <div className="w-full mb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#0C1B44] rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300 group flex-1 min-h-50"
                >
                  <div
                    className={`bg-linear-to-tr ${feature.color} w-fit p-3 rounded-2xl mb-4`}
                  >
                    <feature.icon className="text-white size-6 sm:size-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="flex w-full sm:p-12 p-4 py-8 justify-center items-center flex-col mt-10">
      <div className="max-w-4xl text-center w-full px-2">
        <h1 className="text-5xl w-full max-lg:text-4xl max-md:text-3xl mb-8">
          Premium Access at Wholesale Prices
        </h1>
        <p className="text-xl font-mono text-gray-500">
          Why pay full price when you can get the same premium experience for 
          less? Our customers save an average of ₹1599/year on subscriptions.
        </p>
      </div>
    </div>
  
  </section>
  
  );
};

export default Features;