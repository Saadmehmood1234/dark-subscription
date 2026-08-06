"use client";
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import FaqItem from "./FaqItem";
import FaqContact from "./FaqContact";

const FAQ_DATA = [
  {
    question: "How do I purchase premium accounts on your platform?",
    answer:
      "Our 3-step process makes it easy: 1) Browse our catalog of verified premium accounts (Netflix, Spotify, Tinder, etc.) 2) Select your preferred subscription duration 3) Complete checkout using our secure payment gateway. You'll receive login credentials instantly after payment confirmation.",
    keywords: ["buy premium accounts", "purchase process", "instant delivery"],
  },
  {
    question: "Are these shared or private accounts?",
    answer:
      "We offer both options: Private dedicated accounts (higher cost) and carefully managed shared family plans (more affordable). All accounts are verified weekly to ensure 100% functionality. Shared accounts never exceed 3 users simultaneously.",
    keywords: ["shared accounts", "private accounts", "family plans"],
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment options for your convenience: Credit/Debit Cards (Visa, Mastercard, Amex), PayPal, Cryptocurrency (BTC, ETH, USDT), and bank transfers. All transactions are secured with 256-bit SSL encryption.",
    keywords: ["payment options", "secure payments", "crypto payments"],
  },
  {
    question: "How much can I save compared to official prices?",
    answer:
      "Customers save an average of 60-80%: Netflix Premium normally $22.99/month → Our price $6.99/month | Spotify Family $16.99/month → Our price $4.99/month. Bulk discounts available for 6/12-month purchases.",
    keywords: ["price comparison", "savings", "discounted subscriptions"],
  },
  {
    question: "What if my account stops working?",
    answer:
      "All purchases come with our 30-day replacement guarantee. Simply contact support with your order ID and we'll provide a new account within 2 hours (average response time). After 30 days, replacements cost 20% of original price.",
    keywords: ["account replacement", "warranty", "customer support"],
  },
  {
    question: "Are there any hidden fees or recurring charges?",
    answer:
      "No hidden costs - you pay only the listed price. We never auto-renew subscriptions. Want to extend service? You'll need to manually purchase again, with loyalty discounts for returning customers.",
    keywords: ["no hidden fees", "transparent pricing", "auto-renewal"],
  },
  {
    question: "Which countries do you support?",
    answer:
      "We provide accounts for 45+ countries including USA, UK, Canada, Australia, and most EU nations. Some services have regional restrictions - check product pages for availability in your location.",
    keywords: ["country availability", "regional accounts", "geo-restrictions"],
  },
  {
    question: "How do you offer such low prices?",
    answer:
      "We purchase bulk licenses directly from providers and optimize regional pricing differences. Our automated account verification system keeps overhead costs 80% lower than competitors.",
    keywords: ["bulk discounts", "regional pricing", "low price explanation"],
  },
  {
    question: "Is this service legal?",
    answer:
      "Yes, we operate within platform ToS by utilizing legitimate family/shared plans and regional pricing strategies. Unlike hacked accounts, all our subscriptions are obtained through official channels.",
    keywords: ["legality", "terms of service", "authorized reseller"],
  },
  {
    question: "Can I change the account email/password?",
    answer:
      "Private dedicated accounts: Full access to modify all details. Shared accounts: Email/password changes disabled to protect other users, but you'll always have login access through our dashboard.",
    keywords: ["account control", "password change", "access management"],
  },
  {
    question: "What's your refund policy?",
    answer:
      "Full refunds within 7 days if: 1) Account doesn't work on arrival 2) Service differs from description. After 7 days, prorated refunds for unused months. No refunds for banned accounts due to user violations.",
    keywords: ["refund policy", "money back guarantee", "returns"],
  },
  {
    question: "How do I contact customer support?",
    answer:
      "24/7 assistance available through: Live Chat (bottom-right corner), Email (support@primeflix.com), or Telegram (@PrimeFlixSupport). Average response time is 12 minutes during peak hours.",
    keywords: ["contact support", "customer service", "help center"],
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <section
      className="w-full flex justify-center items-center flex-col px-2 sm:px-4 bg-linear-to-tr from-[#160A25] via-[#180A25] to-[#0D0F29]"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="flex justify-center items-center w-full my-20">
        <div className="w-full max-w-7xl mx-auto px-4" id="faq">
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
            <div className="grid grid-cols-1 gap-6 flex-1">
              {FAQ_DATA.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={setActiveIndex}
                />
              ))}
            </div>

            <div className="flex-1">
              <FaqContact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
