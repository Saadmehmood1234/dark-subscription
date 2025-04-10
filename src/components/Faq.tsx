"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle, Mail, MessageSquareText } from "lucide-react";
import ContactSupportForm from "./ContactSupportForm";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const faqItems = [
    {
      question: "How do I purchase a subscription?",
      answer:
        "Select your desired service, choose a plan, and complete the secure checkout process. You'll receive instant access after payment.",
    },
    {
      question: "Are these subscriptions legitimate?",
      answer:
        "All subscriptions are 100% authentic and verified by our team. We partner directly with service providers.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and cryptocurrency. All transactions are securely encrypted.",
    },
    {
      question: "Can I cancel or transfer subscriptions?",
      answer:
        "Most subscriptions can be managed through your account dashboard. Some restrictions may apply based on provider policies.",
    },
    {
      question: "How do discounts work?",
      answer:
        "We negotiate bulk rates directly with providers. Savings vary by service but typically range from 20-60% off retail prices.",
    },
    {
      question: "What if I encounter issues?",
      answer:
        "Our 24/7 support team is available via live chat and email. Average response time is under 15 minutes.",
    },
  ];

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col p-6 bg-gradient-to-tr from-[#160A25] via-[#180A25] to-[#0D0F29]">
      {!isOpen ? (
        <div className="flex justify-center items-center w-full my-20">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center gap-2 text-[#A92EDF] mb-4">
                <HelpCircle className="size-6" />
                <h2 className="text-2xl sm:text-3xl font-semibold">FAQs</h2>
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
                Find quick answers to common questions about our platform,
                subscriptions, and payment process.
              </p>
            </div>

            <div className="flex max-lg:flex-col max-lg:gap-12 gap-4">
              <div className="grid grid-cols-1  gap-6">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#0C1B44] rounded-xl p-6 transition-all duration-300 cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">
                        {item.question}
                      </h3>
                      <ChevronDown
                        className={`size-6 text-[#A92EDF] transition-transform ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeIndex === index ? "max-h-96 mt-4" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-400 text-base sm:text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="bg-[#0C1B44] rounded-2xl p-8 md:p-12 mx-auto max-w-7xl">
                  <div className="flex flex-col items-center">
                    <MessageSquareText className="size-12 text-[#A92EDF] mb-6" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      Still have questions?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                      Our support team is available 24/7 to help with any
                      questions or issues you might encounter.
                    </p>
                    <button
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="bg-[#A92EDF] cursor-pointer hover:bg-[#70328b] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2"
                    >
                      <Mail className="size-5" />
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContactSupportForm setIsOpen={setIsOpen}/>
      )}
    </div>
  );
};

export default Faq;
