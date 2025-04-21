"use client";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0D071A] to-[#1A0C3D]">
      <div className="max-w-5xl mx-auto py-16 px-6">
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="text-[#A92EDF] w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-xl text-[#B4ACD9] max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>

        <div className="space-y-8">
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <h2 className="text-2xl font-semibold mb-4 text-[#D8C3FF]">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#B4ACD9]">
              By accessing or using PrimeFlix, you agree to be bound by these
              Terms and Conditions and our{" "}
              <a href="/privacy" className="text-[#A92EDF] hover:underline">
                Privacy Policy
              </a>
              . If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <h2 className="text-2xl font-semibold mb-4 text-[#D8C3FF]">
              2. Use of Service
            </h2>
            <p className="text-[#B4ACD9]">
              PrimeFlix grants you a non-exclusive, non-transferable, limited
              license to access and use the service for personal, non-commercial
              purposes.
            </p>
            <div className="bg-[#160A25] p-4 rounded-lg border border-[#2A1E3A] mt-4">
              <p className="text-[#B4ACD9] text-sm">
                <strong>Note:</strong> You agree not to reproduce, distribute,
                or modify any content without our prior written consent.
              </p>
            </div>
          </section>

          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <h2 className="text-2xl font-semibold mb-4 text-[#D8C3FF]">
              3. User Accounts
            </h2>
            <p className="text-[#B4ACD9]">
              To access certain features, you may need to create an account. You
              are responsible for:
            </p>
            <ul className="mt-3 space-y-2 text-[#B4ACD9]">
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>
                  Maintaining the confidentiality of your account information
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>All activities under your account</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>Promptly notifying us of any unauthorized use</span>
              </li>
            </ul>
          </section>

          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <h2 className="text-2xl font-semibold mb-4 text-[#D8C3FF]">
              4. Subscription and Billing
            </h2>
            <p className="text-[#B4ACD9]">
              PrimeFlix offers subscription-based access to content. By
              subscribing, you agree to pay the applicable fees.
            </p>
            <div className="mt-4 flex items-center">
              <a
                href="/refunds"
                className="inline-flex items-center bg-gradient-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 text-white font-medium py-2 px-6 rounded-lg transition-all"
              >
                View Refund Policy
              </a>
            </div>
          </section>

          {/* Additional sections would follow the same pattern */}

          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <h2 className="text-2xl font-semibold mb-4 text-[#D8C3FF]">
              13. Contact Us
            </h2>
            <p className="text-[#B4ACD9] mb-4">
              For any questions regarding these Terms, please contact our
              support team.
            </p>
            <div className="flex items-center">
              <a
                href="mailto:support@primeflix.site"
                className="inline-flex items-center bg-gradient-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 text-white font-medium py-2 px-6 rounded-lg transition-all"
              >
                Contact Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
