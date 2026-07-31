"use client";
import { ArrowLeftCircle, Clock, MailCheck, BadgeCheck } from "lucide-react";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen text-white bg-linear-to-b from-[#0D071A] to-[#1A0C3D]">
      <div className="max-w-5xl mx-auto py-16 px-6">
        {/* Header Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ArrowLeftCircle className="text-[#A92EDF] w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-xl text-[#B4ACD9] max-w-3xl mx-auto">
            At PrimeFlix, we strive to provide the best streaming experience. If
            you're not satisfied, please review our refund policy below.
          </p>
        </section>

        {/* Eligibility Section */}
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] mb-8">
          <div className="flex items-center mb-6">
            <BadgeCheck className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-2xl font-semibold">Eligibility for Refunds</h2>
          </div>

          <ul className="space-y-4 text-[#B4ACD9]">
            <li className="flex items-start">
              <span className="text-[#A92EDF] mr-2">•</span>
              <span>
                Refund requests must be made within 7 days of subscription
                purchase
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A92EDF] mr-2">•</span>
              <span>Only first-time subscribers are eligible for refunds</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A92EDF] mr-2">•</span>
              <span>
                Refunds are not applicable for promotional or discounted
                subscriptions
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A92EDF] mr-2">•</span>
              <span>
                Partial refunds may be issued for annual plans based on unused
                months
              </span>
            </li>
          </ul>
        </section>

        {/* Request Section */}
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] mb-8">
          <div className="flex items-center mb-6">
            <MailCheck className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-2xl font-semibold">How to Request a Refund</h2>
          </div>

          <div className="text-[#B4ACD9] space-y-4">
            <p>
              To request a refund, please contact our support team with your
              account details and reason for the refund.
            </p>
            <div className="flex items-center mt-4">
              <a
                href="mailto:support@primeflix.site"
                className="inline-flex items-center bg-linear-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 text-white font-medium py-2 px-6 rounded-lg transition-all"
              >
                <MailCheck className="mr-2 w-5 h-5" />
                Contact Support
              </a>
            </div>
            <p className="text-sm text-[#B4ACD9]/70 mt-2">
              Include your account email and transaction ID for faster
              processing
            </p>
          </div>
        </section>

        {/* Processing Section */}
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
          <div className="flex items-center mb-6">
            <Clock className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-2xl font-semibold">Processing Details</h2>
          </div>

          <div className="text-[#B4ACD9] space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>Refunds will be credited to the original payment method within 5-7 days.</span>
              </li>
              {/* <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>Refunds issued to original payment method</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>
                  Bank processing times may vary (typically 3-5 additional days)
                </span>
              </li> */}
            </ul>
            <div className="bg-[#160A25] p-4 rounded-lg border border-[#2A1E3A] mt-4">
              <p className="text-[#B4ACD9] text-sm">
                <strong>Note:</strong> Your subscription access will continue
                until the refund is processed. Cancellation occurs automatically
                upon refund completion.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
